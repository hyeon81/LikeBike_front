"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  setPosition: (position: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

const KakaoMapSearchList = ({ setPosition }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("이태원 맛집");
  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const centerAddressRef = useRef<HTMLSpanElement>(null);
  const clickMarkerRef = useRef<any>(null);

  const infowindowRef = useRef<any>(null);
  const psRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  // 1. Kakao Map SDK 로드
  const loadKakaoScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        resolve();
        return;
      }

      const scriptId = "kakao-map-script";
      if (document.getElementById(scriptId)) {
        const checkLoaded = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            clearInterval(checkLoaded);
            resolve();
          }
        }, 100);
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(resolve);
      };
      script.onerror = reject;
    });
  };

  // 2. 지도 초기화
  const initMap = () => {
    const { kakao } = window;

    const mapInstance = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });
    setMap(mapInstance);

    infowindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });
    psRef.current = new kakao.maps.services.Places();
    geocoderRef.current = new kakao.maps.services.Geocoder();

    // 지도 중심 주소 가져오기
    kakao.maps.event.addListener(mapInstance, "idle", () => {
      const center = mapInstance.getCenter();
      geocoderRef.current.coord2RegionCode(
        center.getLng(),
        center.getLat(),
        (result: any, status: any) => {
          if (
            status === kakao.maps.services.Status.OK &&
            centerAddressRef.current
          ) {
            const region = result.find((r: any) => r.region_type === "H");
            if (region) {
              centerAddressRef.current.innerText = region.address_name;
            }
          }
        }
      );
    });

    // 지도 클릭 이벤트
    kakao.maps.event.addListener(mapInstance, "click", (mouseEvent: any) => {
      geocoderRef.current.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const addrInfo = result[0];
            const detailAddr = `${addrInfo.road_address ? `도로명주소: ${addrInfo.road_address.address_name}<br/>` : ""}지번 주소: ${addrInfo.address.address_name}`;
            const content = `<div style="padding:5px;font-size:13px;"><b>주소</b><br/>${detailAddr}</div>`;

            if (clickMarkerRef.current) clickMarkerRef.current.setMap(null);

            const marker = new kakao.maps.Marker({
              position: mouseEvent.latLng,
              map: mapInstance,
              image: new kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                new kakao.maps.Size(36, 37)
              ),
            });

            infowindowRef.current.setContent(content);
            infowindowRef.current.open(mapInstance, marker);

            clickMarkerRef.current = marker;

            // 부모 컴포넌트에 위치 전달
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
              address: addrInfo.address.address_name,
            });
          }
        }
      );
    });
  };

  useEffect(() => {
    loadKakaoScript()
      .then(() => initMap())
      .catch((err) => {
        console.error("Kakao map script load error", err);
      });
  }, []);

  // 3. 검색
  const searchPlaces = (query: string) => {
    const { kakao } = window;
    if (!query.trim()) return alert("키워드를 입력해주세요!");

    psRef.current.keywordSearch(
      query,
      (data: any, status: any, paginationObj: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(paginationObj);

          const bounds = new kakao.maps.LatLngBounds();
          markers.forEach((m) => m.setMap(null));

          const newMarkers = data.map((place: any) => {
            const position = new kakao.maps.LatLng(place.y, place.x);
            const marker = new kakao.maps.Marker({
              map,
              position,
            });

            kakao.maps.event.addListener(marker, "click", () => {
              displayInfowindow(marker, place.place_name);
            });

            bounds.extend(position);
            return marker;
          });

          setMarkers(newMarkers);
          map.setBounds(bounds);
        } else {
          alert(
            status === kakao.maps.services.Status.ZERO_RESULT
              ? "검색 결과가 없습니다."
              : "검색 중 오류가 발생했습니다."
          );
        }
      }
    );
  };

  const displayInfowindow = (marker: any, title: string) => {
    infowindowRef.current.setContent(
      `<div style="padding:5px;">${title}</div>`
    );
    infowindowRef.current.open(map, marker);
  };

  return (
    <div
      className="map_wrap"
      style={{
        position: "relative",
        width: "100%",
        height: 500,
        backgroundColor: "white",
      }}
    >
      {/* 지도 중앙 주소 표시 */}
      <div
        className="hAddr"
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          borderRadius: "4px",
          padding: "8px",
          zIndex: 1,
        }}
      >
        <span style={{ fontWeight: "bold" }}>지도 중심 주소</span>
        <br />
        <span ref={centerAddressRef} id="centerAddr"></span>
      </div>

      {/* 지도 */}
      <div
        id="map"
        ref={mapRef}
        style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}
      />

      {/* 검색 */}
      <div className="bg_white" style={{ padding: "10px" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchPlaces(keyword);
          }}
          style={{ textAlign: "center" }}
        >
          키워드 :
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            size={15}
            style={{ marginLeft: 5 }}
          />
          <button type="submit" style={{ marginLeft: 5 }}>
            검색하기
          </button>
        </form>

        <ul>
          {places.map((place, idx) => (
            <li
              key={idx}
              style={{
                borderBottom: "1px solid #888",
                padding: 10,
                cursor: "pointer",
              }}
              onClick={() => displayInfowindow(markers[idx], place.place_name)}
            >
              <div style={{ paddingLeft: 10 }}>
                <h5>{place.place_name}</h5>
                <span>{place.road_address_name || place.address_name}</span>
                <br />
                <span style={{ color: "green" }}>{place.phone}</span>
              </div>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          {pagination &&
            Array.from({ length: pagination.last }, (_, i) => i + 1).map(
              (num) => (
                <a
                  key={num}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    pagination.gotoPage(num);
                  }}
                  style={{
                    marginRight: 10,
                    fontWeight: pagination.current === num ? "bold" : "normal",
                    color: pagination.current === num ? "#777" : undefined,
                  }}
                >
                  {num}
                </a>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default KakaoMapSearchList;
