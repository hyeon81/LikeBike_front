import styled from "styled-components";
import { useRouter } from "next/navigation";
import ScoreLabel from "./ScoreLabel";
import MainBase from "./MainBase";

const BikeLogMain = () => {
  const router = useRouter();

  return (
    <MainBase
      bgcolor="#009277"
      chipTitle="매일"
      path="/bikelog"
      title="자전거 타기 인증"
    />
  );
};

export default BikeLogMain;
