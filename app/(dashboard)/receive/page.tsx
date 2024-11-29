'use client';

import { useEffect, useState } from "react";

export default function Receive() {     // useEffect 같은 훅은 리액트 컴포넌트에서 사용 가능 -> 함수명 대문자로.
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/receive');
            const data = await response.json();
            setMessage(data.message);
        }
        fetchData();
    }, []);

    return (
        <div>
            receive, msg: {message}
        </div>
    );
}