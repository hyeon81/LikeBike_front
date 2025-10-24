import { useEffect, useState } from "react";

const SCRIPT_ID = "kakao-map-sdk";
const SRC = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services`;

export default function useKakao() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // already ready
    if ((window as any).kakao?.maps) {
      setLoaded(true);
      return;
    }

    const callMapsLoad = () => {
      try {
        if ((window as any).kakao?.maps?.load) {
          (window as any).kakao.maps.load(() => setLoaded(true));
        } else if ((window as any).kakao && !(window as any).kakao.maps) {
          // kakao exists but maps not ready, try small poll then call load
          const t = setInterval(() => {
            if ((window as any).kakao?.maps?.load) {
              clearInterval(t);
              (window as any).kakao.maps.load(() => setLoaded(true));
            }
          }, 50);
          setTimeout(() => clearInterval(t), 5000);
        }
      } catch (e: any) {
        setError(e);
      }
    };

    const existing = document.getElementById(
      SCRIPT_ID
    ) as HTMLScriptElement | null;
    if (existing) {
      // script tag exists; wait for kakao to be ready or attach load
      if ((window as any).kakao?.maps) {
        setLoaded(true);
      } else {
        existing.addEventListener("load", () => callMapsLoad());
        existing.addEventListener("error", () =>
          setError(new Error("Failed to load Kakao SDK"))
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SRC;
    script.async = true;
    script.onload = () => callMapsLoad();
    script.onerror = () => setError(new Error("Failed to load Kakao SDK"));
    document.head.appendChild(script);
  }, []);

  return { loaded, error };
}
