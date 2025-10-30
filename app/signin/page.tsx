"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${window.location.origin}/oauth&response_type=code`;
    if (kakaoLoginUrl) {
      window.location.href = kakaoLoginUrl;
    } else {
      console.error("Kakao login URL is not defined.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full min-h-screen">
      <img src="/images/logo.svg" alt="logo" className="w-[231px] h-[36px]" />

      <div
        onClick={handleKakaoLogin}
        className="flex items-center justify-center w-[300px] min-h-[45px] bg-gray-200 cursor-pointer relative"
      >
        <img
          src="/images/kakao_login_large_wide.png"
          alt="login"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
