import { Avatar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();
  return (
    <Container>
      <Image src="/images/logo.svg" alt="logo" width={231} height={36} />
      <Avatar onClick={() => router.push("/my")} />
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
