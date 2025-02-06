'use client';

import { StoresType } from "@/app/api/models/store";
import StoreImage from "@/app/components/image/StoreImage";
import BasicMap from "@/app/map/BasicMap";
import NotFound from "@/app/not-found";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/*
Next.js에서는 클라이언트 컴포넌트가 `async`함수나 비동기 작업 실행하는 것을 제한하고 있기 때문에
클라이언트 컴포넌트에서 `parmas` 을 처리하려면, 
비동기 로직을 `useEffect`로 처리하고 `params`를 `useState`로 저장하는 방식으로 수정해야함.

Next.js의 최신 버전에서는 `params`가 `Promise`로 반환되기 때문에 직접적으로 `params.id` 로 접근할 수 없음

1. 비동기적으로 params 값을 처리하려면 useEffect를 사용하고, useState를 통해 그 값을 상태로 저장하여 처리합니다.
2. params를 await로 언랩(unwrap)하고, 그 값이 준비된 후에 필요한 데이터를 로드합니다.
*/

const fetchDetail = async (id: string): Promise<StoresType | null> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stores/list/${id}`);
    if (!response.ok) {
        return null;
    }
    const res = await response.json();
    console.log(`스토어 Response data => ${JSON.stringify(res)}`);

    return res.data;
}

export default function StoreDetail({ params }: { params : {id : string}}) {
    const [storeDetail, setStoreDetail] = useState<StoresType | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const getParams = async () => {
            // params가 비동기 Promise로 전달되므로 await 사용하여 값을 처리합니다.
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        getParams();
    }, [params]);

    useEffect(() => {
        setLoading(true);
        const loadStoreDetail = async () => {
            if (id) {
                const detail = await fetchDetail(id);
                setStoreDetail(detail);
                setLoading(false);
            }
        };
        loadStoreDetail();
    }, [id]);

    // useEffect(() => {
    //     const loadStoreDetail = async () => {
    //         setLoading(true);
    //         const detail = await fetchDetail(params.id);
    //         setStoreDetail(detail);
    //         setLoading(false);
    //     };
    //     loadStoreDetail();
    // }, [params.id]);
    
    //const storeDetail = await fetchDetail(id);

    if (loading) { return <span className="mt-20 loading loading-dots" style={{width: '4.5rem'}}></span>;}

    if (!storeDetail) {
        return NotFound();
    }

    return (
        <div className="w-full">
            <div className="mb-4">
                <button className="w-24 btn btn-primary" onClick={() => router.push('/admin/stores/list')}>목록</button>
                <button className="w-24 ml-1 btn btn-primary" onClick={() => router.push('/admin/stores/list')}>수정</button>
            </div>
            <div className="shadow-xl card bg-base-100">
                <div className="card-body">
                    <ul>
                        <li className="py-2">
                            <h2 className="card-title">{storeDetail.name}</h2>
                        </li>
                        <li>
                            <StoreImage imageUrl={storeDetail.imageUrl} />
                        </li>
                        <li className="py-2"><p>📍 {storeDetail.location?.address}</p></li>
                        <li className="py-2"><p>📱 {storeDetail.tel}</p></li>
                        <li className="py-2">
                            <span>🔍 조회수 </span>
                            {storeDetail.searchCount}
                        </li>
                        <li className="py-2">
                            <span>🔜 {storeDetail.operateTime[0]}</span>
                            <span>🔚 {storeDetail.operateTime[1]}</span>
                        </li>
                        <li className="py-2">
                            <span>🗺 지도 영역 {storeDetail.location?.coordinates[0]} {storeDetail.location?.coordinates[1]}</span>
                            <BasicMap lat={storeDetail.location?.coordinates[0]} lng={storeDetail.location?.coordinates[1]} />
                        </li>
                        <li className="py-2">
                            <span>📆 생성일자</span>
                            <span>
                                    {format(new Date(storeDetail.createdAt), "yyyy-MM-dd HH:mm")}
                            </span>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}