import Button from "../common/Button";

const BikeLogGuide = () => {
  return (
    <>
      <div>
        - [6시 ~ 22시] 사이에 [1시간 이상] 자전거 타기
        <br />
        - [자전거 타기 시작/종료 시] 인증하기 버튼 누르기
        <br />- 버튼을 누른 후 [안전모, 자전거] 촬영하기
      </div>
      <div>인증하기 예시</div>
      <div className="flex flex-row gap-2">
        {[1, 2, 3, 4].map((v) => (
          <div className="w-24 h-36 bg-black relative">
            <div
              className={`absolute w-full bottom-0 bg-green-700 text-white text-center`}
            >
              O
            </div>
          </div>
        ))}
      </div>
      <Button>자전거 타기 시작</Button>
    </>
  );
};

export default BikeLogGuide;
