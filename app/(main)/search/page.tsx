'use client';

import { StoresType } from "@/app/api/models/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const searchParams = useSearchParams();
    console.log(`검색 searchParams: ${searchParams}`);

    const query = decodeURIComponent(searchParams.get('q') ?? '');
    const [results, setResults] = useState<StoresType[]>([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (query) {
            fetch(`/api/search?q=${query}`)
            .then(async (res) => {
                const resData = await res.json();
                console.log(`resData => ${JSON.stringify(resData)}`);

                if (resData.success) {
                    setResults(resData.data);
                    setMsg('');
                } else {
                    setMsg('검색 결과가 없습니다.');
                }
            });
            // .then((res) => res.json())
            // .then((data) => setResults(data));
        }
    }, [query]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">&quot; {query} &quot; 검색 결과</h1>
            <ul className="mt-4">
                {results.length > 0 ? (
                    results.map((item) => (
                        <li key={item._id?.toString()} className="p-2 border-b">
                            <strong>{item.name}</strong> - {item.location?.address} (검색 수: {item.searchCount})
                        </li>
                    ))
                ) : (
                    <p>{msg}</p>
                )}
            </ul>
        </div>
    );
}