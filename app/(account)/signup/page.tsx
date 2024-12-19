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

    // useRef를 통해 input 요소를 참조할 객체를 생성. 일반적으로 DOM 을 직접 조작해야할 때
    // 포커스 설정, 텍스트 입력 초기화, 스크롤 동작 조정
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    let isJoinVaild: boolean = false;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(`## 이메일 value => ${formData.email}`);
        validate(e);
    }
    
    const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const erros = {...errorMsgs};  // 기존 에러 메시지 복사
        const target = e.target.name;

        switch (target) {
            case 'name':
                if (formData.name.length < 3) {
                    erros.name = '이름을 3글자 이상 입력해주세요';
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
                } else if (!/[A-Z]/.test(formData.password)) {
                    erros.password = '비밀번호는 최소 한개의 영문 대문자를 포함해서 입력해주세요.';
                    isJoinVaild = false;
                } else if (!/[a-z]/.test(formData.password)) {
                    erros.password = '비밀번호는 최소 한개의 영문 소문자를 포함해서 입력해주세요.';
                    isJoinVaild = false;
                } else if (!/\d/.test(formData.password)) {
                    erros.password = '비밀번호는 최소 한개의 숫자를 포함해서 입력해주세요.';
                    isJoinVaild = false;
                } else if (!/[@$!%*?&]/.test(formData.password)) {
                    erros.password = '비밀번호는 최소 한개의 특수문자를 포함해서 입력해주세요.';
                    isJoinVaild = false;
                } else {
                    erros.password = '';
                    isJoinVaild = true;
                }
            break;
        }
        
        console.log(`validate, target: ${target}, erros: ${JSON.stringify(erros)}`);
        
        setErrorMsgs(erros);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isJoinVaild) {

        }
    };

    return (
        <form onSubmit={handleSubmit} method="post">
            <div className="w-96" style={{border: '1px solid #eee'}}>
                <div>LOGO</div>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    이름
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="grow" placeholder="Daisy" />
                </label>
                {errorMsgs.name}

                <label className="input input-bordered flex items-center gap-2 my-2">
                    이메일
                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="grow" placeholder="daisy@site.com" />
                </label>
                {errorMsgs.email}

                <label className="input input-bordered flex items-center gap-2 my-2">
                    비밀번호
                    <input 
                        type="password"
                        name="password"
                        ref={passwordInputRef} 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={errorMsgs.password ? 'focus' : 'grow'}
                     />
                </label>
                {errorMsgs.password}

                <button type="submit" className={isJoinVaild ? 'btn my-6 ylw font-semibold w-full' : 'btn my-6 ylw font-semibold w-full btn-disabled'}>
                    회원가입
                </button>
            </div>

        </form>
    );
}

export default Signup;