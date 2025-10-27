export {};

declare global {
  interface Window {
    kakao?: any;
    __kakaoMapInstance?: any;
    __kakaoMarkers?: any[];
    __kakaoInfoWindow?: any;
    __searchKakaoPlaces?: (keyword: string) => void;
    __markerImages?: any;
  }

  // minimal kakao namespace placeholder to satisfy TS where used
  // real types are available via @types or kakao.maps.d.ts if desired
  namespace kakao {
    const maps: any;
    const services: any;
  }
}
