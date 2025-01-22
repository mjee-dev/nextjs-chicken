'use client';

import { showToast } from "@/app/components/util/toastUtils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [response, setResponse] = useState('');
    const router = useRouter();

    const sendData = async () => {
        try {
            const res = await fetch('/api/post', { // '/api/write'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content }),
            });
    
            const result = await res.json();
            setResponse(result.message);
            showToast.success('등록하였습니다.');
            router.push('/list');
        } catch (error) {
            console.error(`Error Data : ${error}`);
            setResponse(`Error sending data`);
            showToast.error('실패하였습니다.');
        }
    };

    return (
        <div className="w-80">
            <label>
                title <input type="text" className="w-full max-w-xs input input-bordered" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
                content <input type="text" className="w-full max-w-xs input input-bordered" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
            </label>
            <button className="btn" onClick={sendData}>제출</button>
            <p>Response: {response}</p>
        </div>
    );
}