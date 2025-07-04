"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import { usePathname, useRouter } from "next/navigation";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MobileWrapper>
      <Container>
        <Header />
        <ChildrenContainer>{children}</ChildrenContainer>
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
  background-color: grey;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 460px;
  height: 100%;
  min-height: 100vh;
  background-color: white;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 16px;
`;
