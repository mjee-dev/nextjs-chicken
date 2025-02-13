'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/components/util/toastUtils";

function Login() {
    // 로그인 정보
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // 비밀번호 표시 여부 상태 관리
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 로그인 처리
        console.log(`로그인 => email: ${formData.email}, password: ${formData.password}`);

        try {
            const res = await signIn("credentials", {
                redirect: false,     // 기본값 true 이므로 생략 가능
                email: formData.email,
                password: formData.password,
                callbackUrl: "/",
            }).then((result) => {
                //alert(JSON.stringify(result));
                console.log(result!.error);

                // {"error":"CredentialsSignin","status":401,"ok":false,"url":null}
                if (result?.ok) {
                    console.log('인증에 성공하였습니다.');
                    router.push("/");   // 인증 성공 후 리다이렉트. 홈으로 설정
                } 
                // {"error":null,"status":200,"ok":true,"url":"http://localhost:3000"}
                else {
                    showToast.error(result?.error ?? '로그인에 실패했습니다.');
                 //   return;
                }
            });
        } catch (error) {
            console.error(`Network error: ${error}`);
        }
      };

      const handleGoogleSignIn = async() => {
        try { 
            await signIn('google');
        } catch (error) {
            console.error(`구글 SignIn Error => ${error}`);
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-80" style={{border: '1px solid #eee'}}>
                <div>로고 영역?</div>
                <label className="flex items-center gap-2 my-2 input input-bordered">{/* 이메일 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" name="email" className="grow" placeholder="이메일을 입력해주세요." onChange={handleChange} />
                </label>
                
                <label className="flex items-center gap-2 my-2 input input-bordered">{/* 비밀번호 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="grow"
                        placeholder="비밀번호를 입력해주세요."
                        onChange={handleChange}
                    />
                    <span onClick={togglePassword} className="toggle-password">
                        {showPassword ? '👁️' : '👁‍🗨'}
                    </span>
                </label>
                <button type="submit" className={'btn my-6 ylw w-full'}>로그인</button>

            </div>
                {/* 간편 로그인 네이버 카카오톡 구글 */}
                <button className="w-full my-1 btn btn-outline btn-accent"
                    onClick={(e) => {
                    e.preventDefault(); // 기본 form 제출 방지
                    handleGoogleSignIn();}}
                >
                    Google 로그인</button>
                <button className="w-full my-1 btn btn-outline btn-error">카카오 로그인</button>
        </form>
    );
}

export default Login;