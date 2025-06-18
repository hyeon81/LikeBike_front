import styled from "styled-components";
import { useRouter } from "next/navigation";
import ScoreLabel from "./ScoreLabel";
import MainBase from "./MainBase";

const CourseMain = () => {
  const router = useRouter();
  return (
    <MainBase
      bgcolor="#66D2BE"
      chipTitle="상시"
      path="/course"
      title="자전거 코스 추천"
    />
  );
};

export default CourseMain;
