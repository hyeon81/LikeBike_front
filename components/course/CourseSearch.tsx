"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useKakao from "@/hooks/useKakao";
import ReactModal from "react-modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";

interface Props {
  onClose: () => void;
  onSelect: (place: any) => void;
}

export default function CourseSearch({ onClose, onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<any[]>([]);
  const [currentPlace, setCurrentPlace] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { loaded, error } = useKakao();

  useEffect(() => {
    if (!loaded) return;
    if (error) return console.error(error);
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const initMap = () => {
    const { kakao } = window;
    if (!mapRef.current) return;

    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    });

    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    let markers: any[] = [];

    // 마커 이미지 설정
    const normalImage = new kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 회색/작은 마커로 바꿀 수도 있음
      new kakao.maps.Size(24, 35)
    );

    const selectedImage = new kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 선택 시 빨간색 마커
      new kakao.maps.Size(32, 46)
    );

    const displayMarkers = (places: any[]) => {
      // 기존 마커 제거
      markers.forEach((m) => m.setMap(null));
      markers = [];

      const bounds = new kakao.maps.LatLngBounds();

      places.forEach((place) => {
        const lat = Number(place.y) || 0;
        const lng = Number(place.x) || 0;
        const position = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
          position,
          map,
          image: normalImage,
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

        (marker as any).placeId = place.id;

        markers.push(marker);
        bounds.extend(position);
      });

      map.setBounds(bounds);

      // 전역 저장
      window.__kakaoMapInstance = map;
      window.__kakaoMarkers = markers;
      window.__kakaoInfoWindow = infowindow;
      window.__markerImages = { normalImage, selectedImage };
    };

    const searchPlaces = (keyword: string) => {
      if (!keyword.trim()) return;
      setLoading(true);
      ps.keywordSearch(keyword, (data: any[], status: any, pagination: any) => {
        setLoading(false);
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayMarkers(data);
        } else {
          setPlaces([]);
        }
      });
    };

    window.__searchKakaoPlaces = searchPlaces;
    searchPlaces(keyword);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.__searchKakaoPlaces) {
      window.__searchKakaoPlaces(keyword);
    }
  };

  const handlePlaceClick = (place: any) => {
    setCurrentPlace(place);

    const { kakao } = window;
    const map = window.__kakaoMapInstance as any;
    const infowindow = window.__kakaoInfoWindow as any;
    const markers = window.__kakaoMarkers as any[];
    const { normalImage, selectedImage } = window.__markerImages;

    if (!map || !markers) return;

    // 선택된 마커 찾기
    const selectedMarker = markers.find((m: any) => m.placeId === place.id);
    if (!selectedMarker) return;

    // 모든 마커를 기본 이미지로 초기화
    markers.forEach((m) => m.setImage(normalImage));

    // 선택된 마커만 강조
    selectedMarker.setImage(selectedImage);

    // 지도 중심 이동
    const pos = new kakao.maps.LatLng(place.y, place.x);
    map.panTo(pos);

    // 인포윈도우 표시
    infowindow.setContent(
      `<div style="padding:5px;">${place.place_name}</div>`
    );
    infowindow.open(map, selectedMarker);
  };

  const onSubmitPlace = () => {
    if (currentPlace) {
      onSelect(currentPlace);
      onClose();
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-end items-center mb-2">
        <button type="button" className="cursor-pointer" onClick={onClose}>
          <CloseIcon fontSize="large" />
        </button>
      </div>
      {/* 검색창 */}
      <form onSubmit={handleSearch} className="flex items-center mb-4 relative">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="장소를 입력하세요"
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Image src="/icons/search.svg" alt="search" width={24} height={24} />
        </button>
      </form>

      {/* 지도 */}
      <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-3">
        <div ref={mapRef} className="w-full h-[190px] z-30" />
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="flex justify-center py-4 text-gray-500 text-sm">
          🔍 검색 중...
        </div>
      )}

      {/* 결과 리스트 */}
      <div className="flex-1 border border-gray-200 rounded-lg divide-y divide-gray-200 overflow-y-auto h-[500px]">
        {places.map((p, i) => (
          <div
            key={p.id}
            onClick={() => handlePlaceClick(p)}
            className={`p-4 cursor-pointer transition-colors ${
              currentPlace?.id === p.id
                ? "bg-contrast-light border-l-4 border-contrast-dark bg-contrast-light"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <LocationOnIcon
                fontSize={"large"}
                className="text-contrast-dark"
              />
              <div className="flex flex-col gap-0.5">
                <div className="text-gray-800">{p.place_name}</div>
                <div className="text-sm text-gray-medium">
                  {p.road_address_name || p.address_name}
                </div>
              </div>
            </div>
          </div>
        ))}
        {places.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-6 text-sm">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
      <button
        className={`${!currentPlace ? "bg-gray-lightest text-gray-medium" : "bg-contrast-dark text-white cursor-pointer"} p-4 rounded-xl text-center text-lg font-bold my-4 w-full`}
        disabled={!currentPlace || loading}
        onClick={onSubmitPlace}
      >
        선택
      </button>
    </div>
  );
}
