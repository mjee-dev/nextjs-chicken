'use client';

import React, { useState } from "react";

export default function Write() {
    const [data, setData] = useState('');
    const [response, setResponse] = useState('');

    const sendData = async () => {
        try {
            const res = await fetch('/api/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data }),
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
            <input type="text" className="input input-bordered w-full max-w-xs" name="title" value={data} onChange={(e) => setData(e.target.value)}/>
            <button className="btn" onClick={sendData}>제출</button>
            <p>Response: {response}</p>
        </div>
    );
}