import styled from "styled-components";
import { useRouter } from "next/navigation";
import ScoreLabel from "./ScoreLabel";
import MainBase from "./MainBase";

const CourseMain = () => {
  const router = useRouter();
  return (
    <MainBase
      chipTitle="주 2회"
      path="/course"
      title="자전거 코스 추천"
      scoreText="+10점"
    />
  );
};

export default CourseMain;
