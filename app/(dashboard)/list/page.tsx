'use client';

import { BoardType } from "@/app/api/models/list";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const PostList = () => {
    const [posts, setPosts] = useState<BoardType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/list?page=${page}&limit=5`
            );
            const result = await response.json();

            if (result.success) {
                setPosts(result.data);      // 게시글 데이터를 상태에 저장
                setTotalPages(result.pagination.totalPages);
                setLoading(false);
            } else {
                // TODO: 에러 UI 처리
                console.error(`Store List Error => ${JSON.stringify(result.error)}`);
            }
        };

        fetchPosts();
    }, [page]);

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    if (loading) {return <span className="mt-20 loading loading-dots" style={{width: '4.5rem'}}></span>;}

    return (
        <div className="shadow-xl card bg-base-100 w-96">
            <Link href='/write'>
                <button className="btn" >새 글 작성</button>
            </Link>

            {/* 페이징 */}
            <div className="mt-3 join">
                <button className="join-item btn" onClick={handlePrev} disabled={page === 1}>«</button>

                {/* <input 
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label={page.toString()}
                    defaultChecked />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                <button className="join-item btn" onClick={handleNext} disabled={page === totalPages}>»</button> */}

                {/* 페이지 번호 버튼 생성 */}
                
                {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1; // 페이지 번호는 1부터 시작
                    
                    return (
                    <input
                        key={pageNumber}
                        className="join-item btn btn-square"
                        type="radio"
                        name="options"
                        aria-label={pageNumber.toString()}  // 페이지 번호를 aria-label로 설정
                        defaultChecked={page === pageNumber} // 현재 페이지에 맞는 버튼만 checked
                        onChange={() => handlePageChange(pageNumber)} // 페이지 변경 핸들러
                    />
                    );
                })}

                <button className="join-item btn" onClick={handleNext} disabled={page === totalPages}>»</button>
            </div>

            <div className="mt-3">
                <button onClick={handlePrev} disabled={page === 1}>
                    ⏪
                </button>
                <span>{`Page ${page} of ${totalPages}`}</span>
                <button onClick={handleNext} disabled={page === totalPages}>
                    ⏩
                </button>
            </div>
            
            {posts.map((item) => (
                <div className="card-body" key={item._id?.toString()}>
                    <Link href={`/list/${item._id?.toString()}`}>
                        <ul>
                            <li>
                                <h2 className="card-title">{item.title}</h2> key: {item._id?.toString()}
                            </li>
                            <li>
                                <p>{item.content}</p>
                            </li>
                            {/* 날짜 포맷팅이 필요하다면 주석 해제 */}
                            <li>
                                <p>
                                    <small>{format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}</small>
                                </p>
                            </li>
                        </ul>
                    </Link>
                </div>
            ))}
            
            
        </div>
    );
};

export default PostList;