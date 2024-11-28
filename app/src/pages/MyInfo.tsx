'use client';

import React from "react";
import MainLayout from "../layout/main-layout";

function MyInfo() {
    const userId  = 'parpms';
    return (
        <MainLayout>
            <div className="contain-content">
                My Info <br></br>
                Hi, ${userId}

                <br></br>
            
                <button className="btn btn-primary">Button</button>
                <button className="btn w-64 rounded-full">버튼</button>
            </div>
        </MainLayout>
    );
}

export default MyInfo;