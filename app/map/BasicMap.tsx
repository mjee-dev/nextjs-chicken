'use client';

import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function BasicMap() {

  const [isLoaded, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAOMAP_KEY!,
    libraries: ['clusterer', 'drawing', 'services']
  });

  if (isLoaded) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
      // <Map
      //     id="map"
      //     center={{
      //         lat: 33.450701,
      //         lng: 126.5700667
      //     }}
      //     style={{
      //         width: '100%',
      //         height: '350px',
      //         border: '1px solid'
      //     }}
      //     level={3}
      // />
      <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "500px", borderRadius: '5px' }}
      >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{color:"#000"}}>Hello World!</div>
      </MapMarker>
    </Map>
  )
}