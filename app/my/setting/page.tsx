"use client";

import { COLORS } from "@/constant/color";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";

export default function Home() {
  return <Container>세팅 페이지</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  padding-top: 16px;
`;
