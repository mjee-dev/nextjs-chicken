'use client';

import { StoresType } from "@/app/api/models/store";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const GetList = () => {
    const [stores, setStores] = useState<StoresType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const fetchStores = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stores/list?page=${page}&limit=${limit}`
            );
            const result = await response.json();

            if (result.success) {
                setStores(result.data);
                setTotalPages(result.pagination.totalPages);
                setLoading(false);
            } else {
                // TODO: 에러 UI 처리
                console.error(`스토어 List Error => ${JSON.stringify(result.error)}`);
            }
        };

        fetchStores();
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

    const currentTime = Number(format(new Date(), "HHmm"));

    if (loading) {return <span className="mt-20 loading loading-dots" style={{width: '4.5rem'}}></span>;}

    return (
        <div className="w-full shadow-xl">
            <div className="mb-4">
                <Link href='/admin/stores/create'>
                    <button className="btn">Store 등록</button>
                </Link>
            </div>

            {/* 페이징 */}
            <div className="join">
                <button className="join-item btn" onClick={handlePrev} disabled={page === 1}>«</button>

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
            
            {stores.map((item) => ( 
                <div className="card-body" key={item._id?.toString()}>
                    <Link href={`/admin/stores/list/${item._id?.toString()}`}>
                        <ul>
                            <li>
                                <h2 className="card-title">{item.name}</h2>
                            </li>
                            <li>
                                <p>{item.location?.address}</p>
                            </li>
                            {/* 날짜 포맷팅이 필요하다면 주석 해제 */}
                            <li>
                            {currentTime >= item.operateTime[0] && currentTime <= item.operateTime[1] 
                                ? (
                                    <span className="block" style={{color:'#078b54'}}>영업중</span>
                                ) : (
                                    <span className="block"  style={{color:'#EB5757'}}>영업 종료</span>
                                )
                            }
                            <span>
                                🕑{item.operateTime[0].toString().length === 3 
                                    ? `0${item.operateTime[0].toString().substring(0, 1)}:${item.operateTime[0].toString().substring(1, 3)}`
                                    : `${item.operateTime[0].toString().substring(0, 2)}:${item.operateTime[0].toString().substring(2, 4)}`
                                    }
                                ~ {item.operateTime[1].toString().length === 3 
                                    ? `0${item.operateTime[1].toString().substring(0, 1)}:${item.operateTime[1].toString().substring(1, 3)}`
                                    : `${item.operateTime[1].toString().substring(0, 2)}:${item.operateTime[1].toString().substring(2, 4)}`
                                    }
                            </span>
                            </li>
                            <li>
                                <span>
                                    {format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}
                                </span>
                            </li>
                        </ul>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default GetList;