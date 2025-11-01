"use client";

import useKakao from "@/hooks/useKakao";

export default function KakaoLoader() {
  // keep this component for pages/layout to include a loader early if desired
  const { loaded, error } = useKakao();
  // // side-effect logging only
  // if (loaded) console.log("✅ Kakao Maps SDK loaded");
  // if (error) console.error("Kakao SDK load error", error);

  return null;
}
