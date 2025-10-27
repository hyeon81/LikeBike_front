import React, { useEffect, useRef, useState } from "react";
import useKakao from "@/hooks/useKakao";

export default function KakaoMapSearch() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("이태원 맛집");
  const [places, setPlaces] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const { loaded, error } = useKakao();

  useEffect(() => {
    if (!loaded) return;
    if (error) return console.error(error);
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const initMap = () => {
    const { kakao } = window as any;
    if (!kakao || !kakao.maps) return;

    kakao.maps.load(() => {
      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      });

      const ps = new kakao.maps.services.Places();
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      let markers: any[] = [];

      const clearMarkers = () => {
        markers.forEach((m) => m.setMap(null));
        markers = [];
      };

      const displayMarkers = (places: any[]) => {
        clearMarkers();
        const bounds = new kakao.maps.LatLngBounds();

        places.forEach((place, i) => {
          const lat = Number(place.y) || 0;
          const lng = Number(place.x) || 0;
          const position = new kakao.maps.LatLng(lat, lng);
          const marker = new kakao.maps.Marker({ position, map });

          kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.setContent(
              `<div style="padding:5px;">${place.place_name}</div>`
            );
            infowindow.open(map, marker);
          });
          kakao.maps.event.addListener(marker, "mouseout", () =>
            infowindow.close()
          );

          markers.push(marker);
          bounds.extend(position);
        });

        map.setBounds(bounds);
      };

      const searchPlaces = (keyword: string) => {
        if (!keyword.trim()) return alert("키워드를 입력해주세요!");
        ps.keywordSearch(
          keyword,
          (data: any[], status: any, pagination: any) => {
            if (status === kakao.maps.services.Status.OK) {
              setPlaces(data);
              setPagination(pagination);
              displayMarkers(data);
            }
          }
        );
      };

      // 전역 함수에 저장 (폼에서 접근하기 위함)
      (window as any).__searchKakaoPlaces = searchPlaces;

      // 초기 검색 실행
      searchPlaces(keyword);
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const fn = (window as any).__searchKakaoPlaces;
    if (fn) fn(keyword);
  };

  return (
    <div className="relative w-full h-[500px]">
      <div ref={mapRef} className="w-full h-full" />

      <div className="absolute top-0 left-0 bottom-0 w-[250px] bg-white/80 m-2 p-3 rounded-lg overflow-y-auto text-sm z-10">
        <form onSubmit={handleSearch} className="flex justify-center mb-3">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="키워드를 입력하세요"
            className="border p-1 rounded w-[120px]"
          />
          <button
            type="submit"
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            검색
          </button>
        </form>

        <ul>
          {places.map((p, i) => (
            <li key={p.id} className="border-b py-2 cursor-pointer">
              <h5 className="font-semibold">
                {i + 1}. {p.place_name}
              </h5>
              <p className="text-gray-600 text-xs">
                {p.road_address_name || p.address_name}
              </p>
              {p.phone && <p className="text-green-600 text-xs">{p.phone}</p>}
            </li>
          ))}
        </ul>

        {pagination && (
          <div className="text-center mt-2">
            {Array.from({ length: pagination.last }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => pagination.gotoPage(num)}
                  className={`mx-1 ${
                    num === pagination.current ? "font-bold text-gray-500" : ""
                  }`}
                >
                  {num}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
