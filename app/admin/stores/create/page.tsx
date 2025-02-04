'use client';

import { inputTel } from "@/app/components/util/commonUtils";
import { showToast } from "@/app/components/util/toastUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
    type FomData = {
        name: string;
        address: string;
        lat: number;
        lng: number;
        tel: string;
        startTime: number;
        endTime: number;
        searchCount: number;
    };
    
    const [formData, setFormData] = useState<FomData>({
        name: '',
        address: '',
        lat: 0,
        lng: 0,
        tel: '',
        startTime: 0,
        endTime: 0,
        searchCount: 0
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

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const transData = {
            name: formData.name,
            location: {
                address: formData.address,
                coordinates: [formData.lat, formData.lng]
            },
            tel: formData.tel,
            operateTime: [formData.startTime, formData.endTime]
        };

        try {
            const res = await fetch('/api/admin/stores/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( transData )
            });

            const resData = await res.json();
            console.log(`resData => ${JSON.stringify(resData)}`);
            if (resData.status === 200) {
                showToast.success(`store 등록 성공`);
                // store 목록 화면으로 이동
                router.push("/admin/stores/list");
            } else {
                console.error(`store 등록 실패, ${JSON.stringify(resData)}`);
                showToast.error(`store 등록 실패, ${JSON.stringify(resData)}`);
            }

        } catch (error) {
            console.error(`Network Error: ${error}`);
            showToast.error(`Network Error store 등록 실패: ${error} `);
        }
    }

    return (
        <form onSubmit={handleSubmit} method="post">
            <div className="w-80">
                <label>
                    가게명
                    <input 
                        type="text"
                        className="w-full max-w-xs input input-bordered input-md" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} />
                </label>
                <label>
                    주소
                    <input 
                        type="text"
                        className="w-full max-w-xs input input-bordered input-md" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange} />
                </label>
                <label>
                    위도
                    <input
                        type="text"
                        className="max-w-xs input input-bordered input-md" 
                        name="lat"
                        value={formData.lat} 
                        onChange={handleChange} />
                </label><br/>
                <label>
                    경도
                    <input
                        type="text"
                        className="max-w-xs input input-bordered input-md"
                        name="lng"
                        value={formData.lng}
                        onChange={handleChange} />
                </label><br/>
                <label>
                    전화번호
                    <input
                        type="tel"
                        className="w-full max-w-xs input input-bordered input-md"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange} 
                        maxLength={13} />
                </label>
                <label>
                    영업 시작 시간
                    <input
                        type="text"
                        className="w-full max-w-xs input input-bordered input-md"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        maxLength={4} />

                    영업 종료 시간
                    <input
                        type="text"
                        className="w-full max-w-xs input input-bordered input-md"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        maxLength={4} />
                </label>
                <button type="submit" className="btn">등록</button>
            </div>
        </form>
    );
}