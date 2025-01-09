import { connectToDatabase } from "@/app/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Users } from "../../models/user";

const handler = NextAuth({
    debug: true,    // 디버그 모드 활성화 (운영에선 false로 변경)
    providers: [
        // Credentials 사용자 인증 로그인
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
        // Github 로그인
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        // Google 로그인
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            authorization: {
                params: {
                    scope: 'openid email profile'
                }
            },
            // profile: (profile) => {
            //     console.log(`구글 프로필 => ${profile}`);
            //     return (
            //         id: profile.id,
            //         name: profile.name,
            //         email: profile.email,
            //         image: profile.picture,
            //     );
            // };
        }),
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
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider === 'google') {
                    // 구글에서 받은 이메일을 사용하여 세션을 처리
                    const dbName = process.env.DB_NAME_CHICKEN;
                    const collectionName = process.env.COLLECTION_USERS;
                    const db = await connectToDatabase(dbName as string);
                    const collection = db.collection(collectionName as string);

                    console.log('--- Database connected');
                    console.log(`--- Connected to database: ${db.databaseName}`);

                    // 사용자 이메일로 기존 사용자 확인
                    const existingUser = await Users.findOne({ email: user.email});
                    console.log(`### 사용자 이메일 존재하는지 확인 existingUser => ${existingUser}`);

                    if (!existingUser) {
                        const moment = require('moment');
                        const date = moment().format('YYYY-MM-DD HH:mm:ss');

                        if (account?.provider === 'google' || account?.provider === 'github') {
                            user.password = '';
                        }

                        console.log(`User`);

                        // 새로운 사용자 생성
                        await Users.create({
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            createdAt: date,
                            updatedAt: date
                        });
                    };

                    if (user.email) {
                        return true;
                    } else {
                        return false;
                    }
                }
            
                return true;    // 회원가입 및 로그인 허용
            } catch (error) {
                console.log(`signIn 회원가입 오류 => ${error}`);
                return false;
            }
        },
        async redirect() {
            return '/';
        },
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