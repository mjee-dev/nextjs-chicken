import NotFound from "@/app/not-found";
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
                console.log(`SECRET 값 => ${process.env.SECRET}`);
                const res = await response.json();

                console.log(`res.data => ${JSON.stringify(res.data)}`);

                if (res.message === "OK") {
                    return res.data;    // 인증 성공시 사용자 객체 반환
                } else {
                    throw new Error(res.message);
                }
            },
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID as string,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        // }),
        // GoogleProvider({R
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // }),
    ],
    secret: process.env.SECRET,
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,  //30일동안 세션 유지
        updateAge: 24 * 60 * 60,    // 24시간마다 세션 갱신
    },
    callbacks: {
        async jwt({ token, user}) {
            // 사용자 인증 후 JWT에 사용자 정보 저장
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            // 세션 객체에 사용자 정보 추가
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }

            return session;
        }
    },
});

export { handler as GET, handler as POST };