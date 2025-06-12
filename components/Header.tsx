import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();
  return (
    <Container>
      <div>로고</div>
      <Avatar onClick={() => router.push("/my")} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  background-color: yellow;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;
