'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SearchBar({ setResults }: { setResults: (data: any[]) => void}) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (!query.trim()) return alert('검색어를 입력하세요.');
        router.push(`/search?q=${encodeURIComponent(query)}`);    // 검색어를 URL에 포함해서 이동
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white" /* style={{border: '2px solid red'}} */>
            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h1 className="text-xs font-bold tracking-tight text-gray-900">header</h1>
                
                {/* 검색 창 */}
                <label className="flex items-center gap-2 input input-bordered">
                    <input 
                        type="text" className="grow" placeholder="검색어 입력"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                     />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                        onClick={handleSearch}
                        style={{cursor: 'pointer'}}>
                        <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                </label>
            </div>
        </div>
    );
}