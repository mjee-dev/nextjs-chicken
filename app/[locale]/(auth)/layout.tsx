// app/auth-layout.tsx

import Header from '@/app/components/Header';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
            <main className="main mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 wrapper">
                [auth-Outlet]
                {children} {/* 인증 관련 페이지 (로그인/회원가입 등) */}
            </main>
        </div>
    );
}
