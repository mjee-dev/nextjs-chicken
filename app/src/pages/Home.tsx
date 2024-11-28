'use client';

import React from "react";
import MainLayout from "../layout/main-layout";

function Home() {
    return (
        <MainLayout>
            <div>
                <div className="text-3xl font-bold underline">
                    Hello, Tailwind! 홈!
                </div>
            </div>
        </MainLayout>
    );
}

export default Home;