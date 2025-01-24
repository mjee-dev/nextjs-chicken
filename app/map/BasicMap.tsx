'use client';

import { MapPinIcon } from "@heroicons/react/24/outline";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk"
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

interface BasicMapProps {
  lat?: number;
  lng?: number;
}

const BasicMap: React.FC<BasicMapProps> = ({ lat, lng }) => {
  console.log(`🟡🟡 BasicMap lat: ${lat}, lng: ${lng}`);
  if (!lat || !lng) {
    lat = 33.5563;
    lng = 126.79581 ;
  };

  const position: { lat:number, lng: number }= {
    lat: Number(lat),
    lng: Number(lng)
  };

  console.log(`🗺 lat: ${lat}, lng: ${lng}`);

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
          center={ position }
          style={{ width: "100%", height: "500px", borderRadius: '10px' }}
      >
      <CustomOverlayMap position={ position }>
        <MapMarker
            position={position}
            image={{
              src: '/icons/gps_13709821.png',
              size: {
                width: 64,
                height: 68
              },

            }}
        >
        </MapMarker>
      </CustomOverlayMap>
    </Map>
  )
};

export default BasicMap;
