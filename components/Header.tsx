"use client";

import { getProfile } from "@/apis/user/getProfile";
import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (pathname == "/signin" || pathname == "/signup" || pathname == "/oauth")
    return <></>;

  return (
    <div className="w-full h-16 flex flex-row items-center justify-between px-4 mt-1">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={231}
        height={36}
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
      <Avatar
        onClick={() => router.push("/my")}
        sx={{ cursor: "pointer" }}
        src={user?.profile_image_url ?? undefined}
      />
    </div>
  );
};

export default Header;
