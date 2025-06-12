import { Avatar } from "@mui/material";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <div>로고</div>
      <Avatar />
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
