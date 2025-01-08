import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    
};

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // 사용자 인증 처리하는 부분 (DB에서 사용자 정보 검증)
                const params = {
                    email: credentials?.email,
                    password: credentials?.password
                };
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login/`, {
                   method: 'POST',
                   headers: {
                    "Content-Type": "application/json"
                   },
                   body: JSON.stringify(params)
                });

                const res = await response.json();

                if (res.message === "OK") {
                    return res;
                } else {
                    throw new Error(res.message);
                }
            },
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID as string,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // }),
    ],
    pages: {
        signIn: "/login"
    },
    // callbacks: {
    //     async session({ session, token }) {
    //         session.user.id = token.sub;
    //         return session;
    //     },
    //     async jwt({ token, user}) {
    //         if (user) {
    //             token.sub = user.id;
    //         }
    //         return token;
    //     },
    // },
});

export { handler as GET, handler as POST };