'use client';

import { inputTel } from "@/app/components/util/commonUtils";
import { showToast } from "@/app/components/util/toastUtils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Modify({ params }: { params : {id : string}}) {
    type FormData = {
        name: string;
        address: string;
        lat: number;
        lng: number;
        tel: string;
        startTime: number;
        endTime: number;
        imageUrl: string;
    };

    const [formData, setFormData] = useState<FormData>({
        name: '',
        address: '',
        lat: 0,
        lng: 0,
        tel: '',
        startTime: 0,
        endTime: 0,
        imageUrl: '',
    });

    const fetchDetail = async (id: string): Promise<FormData> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stores/list/${id}`);
        if (!response.ok) throw new Error('스토어 데이터를 불러오지 못했습니다.');
        
        const res = await response.json();
        console.log(`스토어 Response data => ${JSON.stringify(res)}`);
        return {
            name: res.data.name,
            address: res.data.location.address,
            lat: res.data.location.coordinates[0],
            lng: res.data.location.coordinates[1],
            tel: res.data.tel,
            startTime: res.data.operateTime[0],
            endTime: res.data.operateTime[1],
            imageUrl: res.data.imageUrl,
        };
    }

    const [storeDetail, setStoreDetail] = useState<FormData>({
        name: '',
        address: '',
        lat: Number(process.env.NEXT_PUBLIC_DEFAULT_LATITUDE),
        lng: Number(process.env.NEXT_PUBLIC_DEFAULT_LONGITUDE),
        tel: '',
        startTime: 1000,
        endTime: 2300,
        imageUrl: '',
    } as FormData);

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
        const loadStoreDetail = async () => {
            console.log(`loadStoreDetail, id => ${id}`);
            if (id) {
                try {
                    const detail = await fetchDetail(id);
                    setStoreDetail(detail);
                    console.log(`detail => ${JSON.stringify(detail)}`);
                    console.log(`storeDetail => ${JSON.stringify(storeDetail)}`);    
                } catch (error) {
                    console.error(error);
                    showToast.error('스토어 데이터를 불러오지 못했습니다.')
                } finally {
                    setLoading(false);
                }
            }
        };
        
        loadStoreDetail();
    }, [id]);

    // useEffect(() => {
    //     console.log(`storeDetail => ${JSON.stringify(storeDetail)}`);
    // }, [storeDetail]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value, type } = e.target;
        let newValue: string | number = value;

        if (type === 'tel') {
            newValue = inputTel(value); // `inputTel` 함수가 문자열을 반환한다고 가정
        } 
        // else if (name === "lat" || name === "lng" || name === "startTime" || name === "endTime") {
        //     newValue = Number(value); // 숫자 변환
        // }
        console.log(`handleChange, newValue => ${newValue}`);

        setStoreDetail((prev) => {
            if (!prev) return prev;
    
            return {
                ...prev,
                [name]: newValue,
            };
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
        

        const transData = {
            _id: id,
            name: storeDetail.name,
            location: {
                address: storeDetail.address,
                coordinates: [Number(storeDetail.lat), Number(storeDetail.lng)]
            },
            tel: storeDetail.tel,
            operateTime: [Number(storeDetail.startTime), Number(storeDetail.endTime)],
            imageUrl: ''
        };

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

            if (!uploadRes) {
                throw new Error('이미지 업로드 실패');
            }

            const { imageUrl } = await uploadRes.json();

            console.log(`🔥 imageUrl => ${imageUrl}`);

            // 2. 스토어 수정
            transData.imageUrl = imageUrl;
            const storeRes = await fetch(`/api/admin/stores/modify/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( transData )
            });

            const resData = await storeRes.json();
            console.log(`🔥 resData => ${JSON.stringify(resData)}`);

            if (resData.success) {
                setLoading(false);
                showToast.success(`🎉 스토어 수정 성공`);
                // store 목록 화면으로 이동
                router.push("/admin/stores/list");
            } else {
                console.error(`🚨 스토어 수정 실패, ${resData}`);
                showToast.error(`🚨 스토어 수정 실패, ${JSON.stringify(resData)}`);
            }
        } catch (error) {
            console.error(`🚨 Network Error: ${error}`);
            showToast.error(`🚨 스토어 수정 실패: ${error} `);
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
                        value={storeDetail.address}
                        onChange={handleChange}
                    />
                    <label className="label">
                        <span className="label-text">위도</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered" 
                        name="lat"
                        value={storeDetail.lat}
                        onChange={handleChange}
                    />
                    <label className="label">
                        <span className="label-text">경도</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        name="lng"
                        value={storeDetail.lng}
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
                        type="number"
                        className="max-w-xs input input-bordered"
                        name="startTime"
                        value={storeDetail?.startTime}
                        onChange={handleChange}
                        maxLength={4}
                    />
                    <label className="label">
                        <span className="label-text">영업 종료 시간</span>
                    </label>
                    <input
                        type="number"
                        className="max-w-xs input input-bordered "
                        name="endTime"
                        value={storeDetail?.endTime}
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