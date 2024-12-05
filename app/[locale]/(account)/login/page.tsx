'use client';

import React, { useState } from "react";

function Login() {
    // 로그인 정보
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });

    // 비밀번호 표시 여부 상태 관리
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const isLoginVaild: boolean = true; //TODO: 체크

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'email' && value.length === 0) {

        } else if (name === 'password' && value.length === 0) {
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 로그인 처리
        console.log(formData);
        sendData();
    };

    const [response, setResponse] = useState('');
    const sendData = async () => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formData }),
            });
    
            const result = await res.json();
            
            setResponse(result.message);
            console.log(`response : ${response}`);
        } catch (error) {
            console.error(`Error : ${error}`);
            setResponse(`Error sending data`);
        }
    }

    return (
        <form onSubmit={handleSubmit} method="post">
            <div className="w-96" style={{border: '1px solid #eee'}}>
                <div>LOGO</div>
                <label className="input input-bordered flex items-center gap-2 my-2">{/* 아이디 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" name="name" value={formData.name} onChange={handleChange} placeholder="이름을 입력해주세요." />
                </label>

                <label className="input input-bordered flex items-center gap-2 my-2">{/* 이메일 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" className="grow" name="email" value={formData.email} onChange={handleChange} placeholder="이메일을 입력해주세요." />
                </label>
            
                <label className="input input-bordered flex items-center gap-2 my-2">{/* 비밀번호 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="grow"
                        name="password"
                        value={formData.password}
                        placeholder="비밀번호를 입력해주세요."
                        onChange={handleChange}
                    />
                    <span onClick={togglePassword} className="toggle-password">
                        {showPassword ? '👁️' : '👁‍🗨'}
                    </span>
                </label>

                <button type="submit" className={isLoginVaild ? 'btn my-6 ylw font-semibold w-full' : 'btn my-6 ylw font-semibold w-full btn-disabled'}>
                    로그인
                </button>

                {/* 간편 로그인 네이버 카카오톡 구글 */}
                <button className="btn btn-outline btn-success w-full my-1">Naver 로그인</button>
                <button className="btn btn-outline btn-error w-full my-1">카카오 로그인</button>
                <button className="btn btn-outline btn-accent w-full my-1">Google 로그인</button>

            </div>
        </form>
    );
}

export default Login;