'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <div>
                <Header />
                    <main className='main mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 wrapper'>
                        [main-Outlet]
                        {children} {/* 인증 관련 페이지 (로그인/회원가입 등) */}
                    </main>
                <Footer />
            </div>
        </SessionProvider>
    );
}
