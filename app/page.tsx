'use client';

import React from "react";
import MainLayout from "./(main)/layout";
import "./styles/globals.css";

export default function Home() {

  return (
      <div>
        <MainLayout>
            <div className="center-container" style={{border: '1px solid red'}}>
                <div className="text-2xl" style={{letterSpacing: '-0.26px', color: 'rgb(51, 51, 51)', fontWeight: 500, padding: '15px'}}>
                    <span>🔍지금 가장 많이 찾는 스토어</span>
                </div>
                <div style={{ width: '80rem'}}
                >
                  
                  <div className="m-1 shadow-xl card card-compact bg-base-100 w-96 disp" style={{display: 'inline-flex'}}>
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn btn-primary">보러 가기</button>
                      </div>
                    </div>
                  </div>
                  <div className="m-1 shadow-xl card card-compact bg-base-100 w-96" style={{display: 'inline-flex'}}>
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                  <div className="m-1 shadow-xl card card-compact bg-base-100 w-96" style={{display: 'inline-flex'}}>
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Shoes!</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>

                </div>
            </div>
        </MainLayout>
      </div>
  );
}
