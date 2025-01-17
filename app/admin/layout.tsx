// app/auth-layout.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
                <main className='main mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 wrapper'>
                    [main-Outlet]
                    {children}
                </main>
            <Footer />
        </div>
    );
}