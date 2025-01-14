'use client';

import { showToast } from "@/app/components/util/toastUtils";
import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';

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

    // 유효성 값 상태 관리 (`useState` 를 사용하지 않으면 상태를 관리하거나 변경사항을 반영할 수 없음/ `useState`를 사용하지 않을 때는 상태가 변경되더라도 React가 상태 변경을 추적하지 않음)
    const [isValid, setIsValid] = useState(false);
    // useEffect(() => {
    //     const valid =
    //     validateCheck({ target: { name: "name", value: formData.name } } as React.ChangeEvent<HTMLInputElement>) &&
    //     validateCheck({ target: { name: "email", value: formData.email } } as React.ChangeEvent<HTMLInputElement>) &&
    //     validateCheck({ target: { name: "password", value: formData.password } } as React.ChangeEvent<HTMLInputElement>);

    //     setIsValid(valid); // 유효성 검사 결과로 상태 업데이트
    // }, [formData]);     //  `formData` 가 변경될 때마다 `isValid`상태 업데이트


    // // 유효성 체크 함수
    // const validateCheck = (formData) => {
    //     const { name, email, password } = formData;

    //     const isNameValid = name.trim().length >= 3;
    //     const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //     const isPasswordValid = password.length >= 6;

    //     return isNameValid && isEmailValid && isPasswordValid;
    // };

    // // formData가 변경될 때마다 isValid 상태 계산 (메모이제이션 고려)
    // const isValid = useMemo(() => validateCheck(formData), [formData]);


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

        let isNameValid: boolean = false;
        let isEmailValid: boolean = false;
        let isPasswordValid: boolean = false;

        switch (target) {
            case 'name':
                if (formData.name.length < 2) {
                    erros.name = '이름을 2글자 이상 입력해주세요';
                    console.log(`name length => ${formData.name.length}`);
                    isNameValid = false;
                } else {
                    erros.name = '';
                    isNameValid = true;
                }
                break;
        
            case 'email':
                if (formData.email.length === 0) {
                    erros.email = `이메일을 입력해주세요.`;
                    console.log(`email length => ${formData.email.length}`);
                    isEmailValid = false;
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    erros.email = `이메일 형식으로 입력해주세요.`;
                    isEmailValid = false;
                } else {
                    erros.email = '';
                    isEmailValid = true;
                }
                break;

            case 'password':
                if (!formData.password) {
                    erros.password = `비밀번호를 입력해주세요.`;
                    isPasswordValid = false;
                    passwordInputRef.current?.focus();
                } else if (formData.password.length < 8) {
                    erros.password = '비밀번호는 최소 8자 이상 입력해주세요.';
                    isPasswordValid = false;
                // } else if (!/[A-Z]/.test(formData.password)) {
                //     erros.password = '비밀번호는 최소 한개의 영문 대문자를 포함해서 입력해주세요.';
                //     isValid = false;
                // } else if (!/[a-z]/.test(formData.password)) {
                //     erros.password = '비밀번호는 최소 한개의 영문 소문자를 포함해서 입력해주세요.';
                //     isValid = false;
                console.log(`비밀번호 체크, isValid => ${isValid}, length => ${formData.password.length}`);
                } else if (!/\d/.test(formData.password)) {
                    erros.password = '비밀번호는 최소 한개의 숫자를 포함해서 입력해주세요.';
                    isPasswordValid = false;
                } else if (!/[@$!%*?&]/.test(formData.password)) {  // TODO: 최소 한개만 체크했는데 왜 2개 체크해야 true로 넘어가지?
                    erros.password = '비밀번호는 최소 한개의 특수문자를 포함해서 입력해주세요.';
                    isPasswordValid = false;
                } else {
                    erros.password = '';
                    isPasswordValid = true;
                    console.log(`비밀번호 체크 정상, isValid => ${isValid}, length => ${formData.password.length}`);
                }
                
                break;
        }
        const result = isNameValid && isEmailValid && isPasswordValid;
        if (!result) setErrorMsgs(erros);
        
        console.log(`@@@ validateCheck => result: ${result}, isNameValid: ${isNameValid}, isEmailValid: ${isEmailValid}, isPasswordValid: ${isPasswordValid}`);

        return result;
    };

    const [response, setResponse] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 로그인 통신
        // if (isValid) {

        // }
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( formData ),
            });

            const resData = await res.json();
            if (!res.ok) {
                console.error(`회원가입 error: ${resData.error}`);
                handleError(resData.error);
                return;
            }

            if (resData.error) {
                handleError(resData.error);
            } else {
                showToast.success(resData.message);
            }
        } catch (error) {
            console.error(`Network error: ${error}`);
            handleError(error);
            setResponse(`회원가입에 실패했습니다.`);
        }
    };

    const handleError = (error: unknown) => {
        if (typeof error === 'string') {
            showToast.error(error);
        } else {
            showToast.error('알 수 없는 오류가 발생했습니다.');
        }
    }

    return (
        <form onSubmit={handleSubmit} method="post">
            <p>Response: {response}</p>
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

                {/* TODO: isValid 유효성 체크 disabled={!isValid} */}
                <button type="submit" className="btn my-6 ylw font-semibold w-full">
                    회원가입
                </button>
                <button className="btn btn-outline btn-accent w-full my-1" onClick={() => signIn('google')}>Google로 회원가입</button>
                <button className="btn btn-outline btn-success w-full my-1" onClick={() => signIn('github')}>GitHub로 회원가입</button>
            </div>

        </form>
    );
}

export default Signup;