const Wrong = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-red-600">오답입니다.</h1>
      <p className="mt-4 text-lg text-gray-700">
        안타깝게도 고르신 번호는 정답이 아닙니다... 한 번 더 문제를 풀어보시는
        건 어떨까요?
      </p>
    </div>
  );
};

export default Wrong;
