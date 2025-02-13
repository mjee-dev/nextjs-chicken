'use client'

import "@/app/components/util/common";
import BasicMap from "@/app/map/BasicMap";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function MapView() {

const [isLoaded, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAOMAP_KEY!,
    libraries: ['clusterer', 'drawing', 'services']
});

if (isLoaded) return <div>Loading</div>;
if (error) return <div>Error</div>;

//TODO: 프로토타입 연습
const text = 'hello world';
console.log('capitalize: ' + text.capitalize());

const numbers = [1, 2, 3, 4, 5];
console.log(`Array sum: ${numbers.sum()}`); // 15

return (
  <BasicMap />
    // <>
    //     <Map // 지도를 표시할 Container
    //     id="map"
    //     center={{ 
    //         // 지도의 중심좌표
    //         lat: 33.450701,
    //         lng: 126.570667,
    //     }}
    //     style={{
    //         // 지도의 크기
    //         width: "100%",
    //         height: "500px"
    //     }}
    //     level={3} // 지도의 확대 레벨
    //     />
    // </>
  );
}