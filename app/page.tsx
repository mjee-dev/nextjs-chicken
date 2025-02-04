'use client';

import React from "react";
import MainLayout from "./(main)/layout";
import "./styles/globals.css";

export default function Home() {

  return (
      <div>
        <MainLayout>
            <div>
                <div className="text-3xl font-bold underline">
                    Hello, Tailwind! 홈!
                </div>
            </div>
        </MainLayout>
      </div>
  );
}
