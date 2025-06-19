"use client";

import { Avatar } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname == "/signin" || pathname == "/signup") return <></>;

  return (
    <Container>
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={231}
        height={36}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
      <Avatar onClick={() => router.push("/my")} sx={{ cursor: "pointer" }} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-top: 4px;
`;
