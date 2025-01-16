'use client';

import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoMapLoader() {
    useKakaoLoaderOrigin({
        appkey: process.env.NEXT_PUBLIC_KAKAOMAP_KEY!,
        libraries: ['clusterer', 'drawing', 'services']
    });
}