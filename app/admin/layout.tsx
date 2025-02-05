// app/auth-layout.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />
                <main className='px-4 py-6 mx-auto main max-w-7xl sm:px-6 lg:px-8 wrapper'>
                    {children}
                </main>
            <Footer />
        </div>
    );
}