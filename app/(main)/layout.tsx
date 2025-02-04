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
                    <main className='px-4 py-6 mx-auto main sm:px-6 lg:px-8 wrapper' style={{maxWidth: '90rem'}}>
                        {children} {/* 인증 관련 페이지 (로그인/회원가입 등) */}
                    </main>
                <Footer />
            </div>
        </SessionProvider>
    );
}
