"use client";

import { ReactNode } from "react";
import Header from "./Header";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@/constant/color";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

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
