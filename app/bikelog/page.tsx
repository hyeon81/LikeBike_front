"use client";

import { Button } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div>여러분의 안전한 라이딩을 인증해주세요!</div>
      <label htmlFor="file">
        <Button>파일 업로드</Button>
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => console.log("e", e)}
      />
    </div>
  );
}
