import { useRouter } from "next/navigation";
import Image from "next/image";
import MainBase from "./MainBase";

const BikeLogMain = () => {
  const router = useRouter();

  return (
    <MainBase
      chipTitle="매일"
      path="/bikelog"
      title="자전거 타기 인증"
      scoreText="+30점"
    >
      <div className="mt-5">
        <Image width={100} height={100} src="/icons/bike.svg" alt="bike" />
      </div>
    </MainBase>
  );
};

export default BikeLogMain;
