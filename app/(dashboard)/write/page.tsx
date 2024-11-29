'use client';

import React from "react";

function write() {
    return (
        <div className="w-80">
            <form
                action="/server/api/post/new"
                method="post"
                style={{display: 'flex', flexDirection: 'column'}}
            >
            <input name="title" placeholder="제목"></input>
            <textarea name="content" placeholder="내용"></textarea>
            <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default write;