'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function UserGreeting() {
    // 세션 가져오기
    const { data : session, status} = useSession();

    const router = useRouter();
    const goToPage = (str: string) => {
        switch (str) {
            case 'login': router.push('/login'); break;
            case 'signup': router.push('/signup'); break;
        }
    };


    // 세션 표시
    if (status === 'loading') {
        return <span>Loading..</span>
    }

    if (session) {
        return (
            <div>
                <span>{session.user?.name} 으로 로그인</span>
                <button className="btn btn-outline" onClick={() => signOut({ callbackUrl: '/'})}>로그아웃</button>
            </div>
        );
    }

    return (
        <div>
            <button className="btn btn-outline" onClick={() => goToPage('login')}>로그인</button>
            <button className="btn btn-outline" onClick={() => goToPage('signup')}>회원가입</button>
        </div>
    );
}