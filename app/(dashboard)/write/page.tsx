'use client';

import React, { useState } from "react";

export default function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [response, setResponse] = useState('');

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
        } catch (error) {
            console.error(`Error Data : ${error}`);
            setResponse(`Error sending data`);
        }
    };

    return (
        <div className="w-80">
            <label>
                title <input type="text" className="input input-bordered w-full max-w-xs" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
                content <input type="text" className="input input-bordered w-full max-w-xs" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
            </label>
            <button className="btn" onClick={sendData}>제출</button>
            <p>Response: {response}</p>
        </div>
    );
}