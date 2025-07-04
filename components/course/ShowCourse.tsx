"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Position {
  lat: number;
  lng: number;
}

interface Props {
  startPosition: Position;
  midPosition: Position;
  endPosition: Position;
}

const ShowCourse = ({ startPosition, midPosition, endPosition }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakao = window.kakao;
    kakao.maps.load(async () => {
      if (window.kakao && window.kakao.maps) {
        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(startPosition.lat, startPosition.lng),
          level: 5,
        });

        // 경로 요청
        const res = await fetch(
          `https://apis-navi.kakaomobility.com/v1/directions?origin=${startPosition.lng},${startPosition.lat}&destination=${endPosition.lng},${endPosition.lat}&waypoints=${midPosition.lng},${midPosition.lat}&priority=FASTEST`,
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_REST_API_KEY ?? "",
            },
          }
        );
        const data = await res.json();

        const vertexes: number[] = data.routes[0].sections.flatMap(
          (section: any) => section.roads.flatMap((road: any) => road.vertexes)
        );

        const path = [];
        for (let i = 0; i < vertexes.length; i += 2) {
          path.push(new kakao.maps.LatLng(vertexes[i + 1], vertexes[i]));
        }

        const polyline = new kakao.maps.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });

        polyline.setMap(map);

        // 마커 추가
        [startPosition, midPosition, endPosition].forEach((pos) => {
          new kakao.maps.Marker({
            position: new kakao.maps.LatLng(pos.lat, pos.lng),
            map,
          });
        });
      }
    });
  }, [startPosition, midPosition, endPosition]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default ShowCourse;
