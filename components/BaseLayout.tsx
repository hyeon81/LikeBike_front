"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@/constant/color";
import { CircularProgress } from "@mui/material";
import { ACCESS_TOKEN } from "@/constant/storageName";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();

  //로컬스토리지에 accessToken이 없으면 로그인 페이지로 이동
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken && pathname !== "/signin" && pathname !== "/oauth") {
      router.push("/signin");
    } else {
      setLoading(false);
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center items-center w-full h-full bg-gray-400">
        <div
          className="flex flex-col w-full max-w-[460px] h-full min-h-screen"
          style={{ backgroundColor: COLORS.GRAY_BACKGROUND }}
        >
          <Header />
          <div className="flex flex-col w-full h-full flex-1 p-4">
            {children}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default BaseLayout;
