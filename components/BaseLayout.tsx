"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "@/constant/color";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MobileWrapper>
        <Container>
          <Header />
          <ChildrenContainer>{children}</ChildrenContainer>
        </Container>
      </MobileWrapper>
    </QueryClientProvider>
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
  background-color: ${COLORS.GRAY_BACKGROUND};
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 16px;
`;
