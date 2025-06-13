import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>오늘도 안전 퀴즈 풀고 안전한 자전거 생활 지키기</div>
      <div>
        평소 자전거 안전 지식을 점검하고, 퀴즈를 통해 새로운 지식을 쌓아가요!
        포인트는 덤~!
      </div>
      <Link href="/quiz/start" style={{ textDecoration: "none" }}>
        <Button>시작</Button>
      </Link>
    </div>
  );
}
