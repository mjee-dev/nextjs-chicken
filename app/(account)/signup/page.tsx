'use client';

import React, { useRef, useState } from "react";

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errorMsgs, setErrorMsgs] = useState({
        name: '',
        email: '',
        password: ''
    });

    // 비밀번호 표시 여부 상태 관리
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // useRef를 통해 input 요소를 참조할 객체를 생성. 일반적으로 DOM 을 직접 조작해야할 때
    // 포커스 설정, 텍스트 입력 초기화, 스크롤 동작 조정
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    let isJoinVaild: boolean = false;

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {    // 실시간 포커스 아웃시 유효성 검사
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateCheck(e);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateCheck(e);
    }
    
    const validateCheck = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
        const erros = {...errorMsgs};  // 기존 에러 메시지 복사
        const target = e.target.name;

        switch (target) {
            case 'name':
                if (formData.name.length < 2) {
                    erros.name = '이름을 2글자 이상 입력해주세요';
                    console.log(`name length => ${formData.name.length}`);
                    isJoinVaild = false;
                } else {
                    erros.name = '';
                }
                break;
        
            case 'email':
                if (formData.email.length === 0) {
                    erros.email = `이메일을 입력해주세요.`;
                    console.log(`email length => ${formData.email.length}`);
                    isJoinVaild = false;
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    erros.email = `이메일 형식으로 입력해주세요.`;
                    isJoinVaild = false;
                } else {
                    erros.email = '';
                }
                break;

            case 'password':
                if (!formData.password) {
                    erros.password = `비밀번호를 입력해주세요.`;
                    isJoinVaild = false;
                    passwordInputRef.current?.focus();
                } else if (formData.password.length < 8) {
                    erros.password = '비밀번호는 최소 8자 이상 입력해주세요.';
                    isJoinVaild = false;
                // } else if (!/[A-Z]/.test(formData.password)) {
                //     erros.password = '비밀번호는 최소 한개의 영문 대문자를 포함해서 입력해주세요.';
                //     isJoinVaild = false;
                // } else if (!/[a-z]/.test(formData.password)) {
                //     erros.password = '비밀번호는 최소 한개의 영문 소문자를 포함해서 입력해주세요.';
                //     isJoinVaild = false;
                console.log(`비밀번호 체크, isJoinVaild => ${isJoinVaild}, length => ${formData.password.length}`);
                } else if (!/\d/.test(formData.password)) {
                    erros.password = '비밀번호는 최소 한개의 숫자를 포함해서 입력해주세요.';
                    isJoinVaild = false;
                } else if (!/[@$!%*?&]/.test(formData.password)) {  // TODO: 최소 한개만 체크했는데 왜 2개 체크해야 true로 넘어가지?
                    erros.password = '비밀번호는 최소 한개의 특수문자를 포함해서 입력해주세요.';
                    isJoinVaild = false;
                } else {
                    erros.password = '';
                    isJoinVaild = true;
                    console.log(`비밀번호 체크 정상, isJoinVaild => ${isJoinVaild}, length => ${formData.password.length}`);
                }
                
            break;
        }
        
        console.log(`유효성 체크, target: ${target}, erros: ${JSON.stringify(erros)}`);
        
        setErrorMsgs(erros);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 로그인 통신
        if (isJoinVaild) {

        }
    };

    return (
        <form onSubmit={handleSubmit} method="post">
            isJoinVaild ▶ {isJoinVaild ? 'true' : 'false'}
            <div className="w-96" style={{border: '1px solid #eee'}}>
                <div>LOGO</div>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    이름
                    <input type="text" name="name" value={formData.name} onBlur={handleBlur} onChange={handleChange} className="grow" placeholder="Daisy" />
                </label>
                <span className="guideTxt">{errorMsgs.name}</span>

                <label className="input input-bordered flex items-center gap-2 my-2">
                    이메일
                    <input type="text" name="email" value={formData.email} onBlur={handleBlur} onChange={handleChange} className="grow" placeholder="daisy@site.com" />
                </label>
                <span className="guideTxt">{errorMsgs.email}</span>

                <label className="input input-bordered flex items-center gap-2 my-2">
                    비밀번호
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        ref={passwordInputRef} 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={errorMsgs.password ? 'focus' : 'grow'}
                     />
                    <span onClick={togglePassword} className="toggle-password">
                        {showPassword ? '👁️' : '👁‍🗨'}
                    </span>
                </label>
                <span className="guideTxt">{errorMsgs.password}</span>

                <button type="submit" disabled={!isJoinVaild} className="btn my-6 ylw font-semibold w-full">
                    회원가입
                </button>
            </div>

        </form>
    );
}

export default Signup;