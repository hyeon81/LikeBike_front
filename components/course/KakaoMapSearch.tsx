import React, { useEffect, useRef, useState } from "react";

export default function KakaoMapSearch() {
  const mapRef = useRef(null);
  const [keyword, setKeyword] = useState("이태원 맛집");
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    // Kakao 지도 SDK 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  // 지도 초기화
  const initMap = () => {
    const { kakao } = window;
    if (!kakao || !kakao.maps) return;

    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });

    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    let markers = [];

    const searchPlaces = (keyword) => {
      if (!keyword.trim()) {
        alert("키워드를 입력해주세요!");
        return;
      }
      ps.keywordSearch(keyword, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(pagination);
          displayMarkers(data);
        } else {
          alert("검색 결과가 없습니다.");
        }
      });
    };

    const displayMarkers = (places) => {
      clearMarkers();
      const bounds = new kakao.maps.LatLngBounds();

      places.forEach((place, i) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          position,
          map,
        });

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

    const clearMarkers = () => {
      markers.forEach((m) => m.setMap(null));
      markers = [];
    };

    // 초기 실행
    searchPlaces(keyword);

    // 검색용 핸들러 저장
    window.__searchKakaoPlaces = searchPlaces;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (window.__searchKakaoPlaces) {
      window.__searchKakaoPlaces(keyword);
    }
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
