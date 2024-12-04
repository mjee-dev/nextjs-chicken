'use client';

import { ListType } from "@/app/api/models/list";
import Link from "next/link";
import { useEffect, useState } from "react";
//import { format } from 'date-fns';

export default  function List() {     // useEffect 같은 훅은 리액트 컴포넌트에서 사용 가능 -> 함수명 대문자로.
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [boardList, setBoardList] = useState<ListType[]>([]);

    // nextjs에서 async 함수는 권장되지 않으며 데이터 로딩과 같은 비동기 작업은 useEffect훅 사용
    const fetchData = async () => {
        try {
            const response = await fetch('/api/list');
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const res = await response.json();
            console.log(`### res => ${JSON.stringify(res)}`);
            setBoardList(res.data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {      // 데이터 로드를 useEffect로 처리
        fetchData();    // useEffect: 컴포넌트가 마운트된 이후 fetchData 함수 실행
    }, []);

    if (loading) return <div>로딩중 ..</div>
    if (error) return <div>Error : {error}</div>

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
        {boardList.map((item: ListType) => (
            <div className="card-body" key={item._id?.toString()}>
                <Link href={`/list/${item._id?.toString()}`}>
                    <ul>
                        <li><h2 className="card-title">{item.title}</h2> key: {item._id?.toString()}</li>
                        <li><p>{item.content}</p></li>
                        {/* <li><p>{new Date(item.createdAt).toLocaleDateString()}</p></li> */}
                        {/* <p>Created At: {format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm')}</p> */}
                    </ul>
                </Link>
            </div>
       ))}
       </div>
    );
}