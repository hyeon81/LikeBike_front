"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import { Stack } from "@mui/material";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MobileWrapper>
      <Container>
        <Header />
        <Stack padding={2}>{children}</Stack>
      </Container>
    </MobileWrapper>
  );
};

export default BaseLayout;

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: grey;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 460px;
  min-height: 100vh;
  height: 100%;
  background-color: white;
`;
