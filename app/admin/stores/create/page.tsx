'use client';

import { inputTel } from "@/app/components/util/commonUtils";
import { showToast } from "@/app/components/util/toastUtils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Create() {
    type FormData = {
        name: string;
        address: string;
        lat: number;
        lng: number;
        tel: string;
        startTime: number;
        endTime: number;
        searchCount: number;
    };
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        address: '',
        lat: 0,
        lng: 0,
        tel: '',
        startTime: 0,
        endTime: 0,
        searchCount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target) return;
        const { name, value, type } = e.target;
        let newValue = value;

        if (type === 'tel') {
            newValue = inputTel(value); // `inputTel` 함수가 문자열을 반환한다고 가정
        }
        console.log(`handleChange, newValue => ${newValue}`);

        setFormData({
            ...formData,
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

    // formData.name='BHC치킨 강남구청역점';
    // formData.address = '서울특별시 강남구 삼성동 8-5';
    // formData.lat = 37.5154476;
    // formData.lng = 127.0426662;
    // formData.tel = '010-2484-7259';
    // formData.startTime = 1100;
    // formData.endTime = 2330;

    const router = useRouter();
    
    const [loading, setLoading] = useState<boolean>(false);

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
            name: formData.name,
            location: {
                address: formData.address,
                coordinates: [formData.lat, formData.lng]
            },
            tel: formData.tel,
            operateTime: [formData.startTime, formData.endTime],
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

            if (!uploadRes.ok || !uploadRes) {
                throw new Error('이미지 업로드 실패');
            }

            const { imageUrl } = await uploadRes.json();

            console.log(`🔥 imageUrl => ${imageUrl}`);

            // 2. 스토어 등록
            transData.imageUrl = imageUrl;
            const storeRes = await fetch('/api/admin/stores/create', {
                method: 'POST',
                body: JSON.stringify( transData )
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
            <span className="text-2xl font-semibold from-neutral-900">스토어 등록</span>
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
                            value={formData.name}
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
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <label className="label">
                        <span className="label-text">위도</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered" 
                        name="lat"
                        value={formData.lat} 
                        onChange={handleChange}
                    />
                    <label className="label">
                        <span className="label-text">경도</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered"
                        name="lng"
                        value={formData.lng}
                        onChange={handleChange} 
                    />
                    <label className="label">
                        <span className="label-text">전화번호</span>
                    </label>
                    <input
                        type="tel"
                        className="input input-bordered"
                        name="tel"
                        value={formData.tel}
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
                        value={formData.startTime}
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
                        value={formData.endTime}
                        onChange={handleChange}
                        maxLength={4} 
                    />

                    <label className="label">
                        <span className="label-text">스토어 이미지</span>
                    </label>
                    <input type="file" 
                        accept="image/*" 
                        className="w-full max-w-xs file-input"
                        onChange={handleFileChange}
                    />
                    
                    <div className="mt-6 form-control">
                        <button type="submit" className="btn btn-primary" disabled={loading}>스토어 등록</button>
                    </div>
                </div>
            </form>
            {loading ? <span className="mt-20 loading loading-dots" style={{width: '4.5rem'}}></span> : <></>}
        </div>
    );
}