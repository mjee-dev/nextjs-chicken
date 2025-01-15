'use client';

import React from "react";
import MainLayout from "./(main)/layout";
import { showToast } from "./components/util/toastUtils";
import "./styles/globals.css";

const handleOnClick = () => {
  // JSX 요소를 포함한 메시지
  const msg: React.ReactNode = (
      <div>
        회원가입 성공!
        <br />
        홈으로 이동합니다.
      </div>
  );
  showToast.success(msg);
};

export default function Home() {

  return (
      <div>
        <MainLayout>
            <div>
                <div className="text-3xl font-bold underline">
                    Hello, Tailwind! 홈!
                </div>
                <button className="btn" onClick={handleOnClick}>테스트</button>
            </div>
        </MainLayout>
      </div>
  );
}
