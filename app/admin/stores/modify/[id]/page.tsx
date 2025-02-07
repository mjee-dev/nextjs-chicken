'use client';

import { inputTel } from "@/app/components/util/commonUtils";
import { showToast } from "@/app/components/util/toastUtils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const fetchDetail = async (id: string): Promise<StoresType> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stores/list/${id}`);
    if (!response.ok) {
        return null;
    }
    const res = await response.json();
    console.log(`스토어 Response data => ${JSON.stringify(res)}`);
    return res.data;
}

type StoresType = {
    _id: string;
    name: string;
    tel: string;
    operateTime: number[];
    searchCount: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    location: {
        address: string;
        coordinates: number[];
    }
  };

export default function Modify({ params }: { params : {id : string}}) {
    const [storeDetail, setStoreDetail] = useState<StoresType>({
        _id: "",
        name: "",
        tel: "",
        operateTime: [],
        searchCount: 0,
        imageUrl: "",
        createdAt: "",
        updatedAt: "",
        location: {
            address: '',
            coordinates: []
        }
    });
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
            console.log(`loadStoreDetail, id => ${id}`);
            if (id) {
                const detail = await fetchDetail(id);
                console.log(`detail => ${JSON.stringify(detail)}`);
                
                setStoreDetail(detail);
                setLoading(false);

                console.log(`storeDetail => ${JSON.stringify(storeDetail)}`);

            }
        };
        loadStoreDetail();
    }, [id]);

    useEffect(() => {
        console.log(`storeDetail => ${JSON.stringify(storeDetail)}`);
    }, [storeDetail]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value, type } = e.target;
        let newValue = value;

        if (type === 'tel') {
            newValue = inputTel(value); // `inputTel` 함수가 문자열을 반환한다고 가정
        }
        console.log(`handleChange, newValue => ${newValue}`);

        setStoreDetail({
            ...storeDetail,
            [name]: newValue
        });
    };

    const imageRef = useRef<File | null>(null);
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            console.log("🔥 Selected file: ", selectedFile);
            imageRef.current = selectedFile;
            setImage(selectedFile);
        } else {
            console.log("No file selected");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedFile = imageRef.current;

        if (!selectedFile) {
            showToast.warning('🚨 이미지를 선택해주세요.');
            return;
        }

        console.log(`🔥 선택된 이미지 => ${selectedFile}, name => ${selectedFile.name}`);
        
        const fileData = new FormData();    // `File`객체는 JSON으로 변환할 수 없으므로 `formData` 객체 생성
        fileData.append('file', selectedFile);

        fileData.forEach((value, key) => {
            console.log(`🔥 FormData => ${key}:`, value);
        });
        

        // const transData = {
        //     name: storeDetail.name,
        //     location: {
        //         address: storeDetail.location.address,
        //         coordinates: [storeDetail.lat, storeDetail.lng]
        //     },
        //     tel: storeDetail.tel,
        //     operateTime: [formData.startTime, formData.endTime],
        //     imageUrl: ''
        // };

        setLoading(true);
        try {
            // 1. 이미지 업로드 (S3 API 호출)
            const uploadRes = await fetch('/api/admin/stores/upload', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // },
                body: fileData
                // `File` 객체는 JSON으로 변환할 수 없음
            });

            console.log(`🔥 uploadRes => ${JSON.stringify(uploadRes)}`);

            if (!uploadRes.ok || !uploadRes) {
                throw new Error('이미지 업로드 실패');
            }

            const { imageUrl } = await uploadRes.json();

            console.log(`🔥 imageUrl => ${imageUrl}`);

            // 2. 스토어 등록
            storeDetail.imageUrl = imageUrl;
            const storeRes = await fetch('/api/admin/stores/create', {
                method: 'POST',
                body: JSON.stringify( storeDetail )
            });

            const resData = await storeRes.json();
            console.log(`resData => ${JSON.stringify(resData)}`);
            if (resData.status === 200) {
                setLoading(false);
                showToast.success(`🎉 스토어 등록 성공`);
                // store 목록 화면으로 이동
                router.push("/admin/stores/list");
            } else {
                console.error(`🚨 스토어 등록 실패, ${JSON.stringify(resData)}`);
                showToast.error(`🚨 스토어 등록 실패, ${JSON.stringify(resData)}`);
            }

        } catch (error) {
            console.error(`🚨 Network Error: ${error}`);
            showToast.error(`🚨 스토어 등록 실패: ${error} `);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            <span className="text-2xl font-semibold from-neutral-900">스토어 수정</span>
            <form onSubmit={handleSubmit} method="post">
                <div className="mt-2 shadow-xl w- card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">가게명</span>
                        </label>
                        <input 
                            type="text"
                            className="input input-bordered" 
                            name="name" 
                            value={storeDetail.name}
                            onChange={handleChange} 
                        />
                    </div>
                    <label className="label">
                        <span className="label-text">주소</span>
                    </label>
                    <input 
                        type="text"
                        className="input input-bordered" 
                        name="address"
                        value={storeDetail.location?.address}
                        onChange={handleChange}
                    />
                    <label className="label">
                        <span className="label-text">위도</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered" 
                        name="lat"
                        value={storeDetail.location?.coordinates[0]}
                        onChange={handleChange}
                    />
                    <label className="label">
                        <span className="label-text">경도</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        name="lng"
                        value={storeDetail.location?.coordinates[1]}
                        onChange={handleChange} 
                    />
                    <label className="label">
                        <span className="label-text">전화번호</span>
                    </label>
                    <input
                        type="tel"
                        className="input input-bordered"
                        name="tel"
                        value={storeDetail.tel}
                        onChange={handleChange} 
                        maxLength={13} 
                    />
                    <label className="label">
                        <span className="label-text">영업 시작 시간</span>
                    </label>
                    <input
                        type="text"
                        className="max-w-xs input input-bordered"
                        name="startTime"
                        value={storeDetail.operateTime[0]}
                        onChange={handleChange}
                        maxLength={4}
                    />
                    <label className="label">
                        <span className="label-text">영업 종료 시간</span>
                    </label>
                    <input
                        type="text"
                        className="max-w-xs input input-bordered "
                        name="endTime"
                        value={storeDetail.operateTime[1]}
                        onChange={handleChange}
                        maxLength={4} 
                    />

                    <label className="label">
                        <span className="label-text">스토어 이미지 변경</span>
                    </label>
                    <input type="file" 
                        accept="image/*" 
                        className="w-full max-w-xs file-input"
                        onChange={handleFileChange}
                    />
                    
                    <div className="mt-6 form-control">
                        <button type="submit" className="btn btn-primary" disabled={loading}>스토어 수정</button>
                    </div>
                </div>
            </form>
            {loading ? <span className="mt-20 loading loading-dots" style={{width: '4.5rem'}}></span> : <></>}
        </div>
    );
}