'use client';

import { Map, MapMarker } from "react-kakao-maps-sdk"
import useKakaoMapLoader from "./useKakaoMapLoader"

export default function BasicMap() {
    useKakaoMapLoader();

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
            style={{ width: "100%", height: "360px", border:'1px solid' }}
        >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{color:"#000"}}>Hello World!</div>
        </MapMarker>
      </Map>
    )
}