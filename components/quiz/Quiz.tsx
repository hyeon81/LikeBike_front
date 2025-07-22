import { IQuiz } from "@/types/quiz";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import Button from "../common/Button";

const Quiz = ({
  quiz,
  handleClick,
}: {
  quiz: IQuiz | undefined;
  handleClick: (selectedValue: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <div className="bg-secondary-light w-full flex flex-col items-center justify-center p-4 mt-4 text-2xl font-bold">
        {dayjs().format("MM월 DD일")} 문제
      </div>
      <div className="p-4">
        {quiz?.question ? quiz.question : "문제가 없습니다."}
      </div>
      {/* <Link href={quiz?.hint_link ?? ""} className="text-blue-500 underline">
        <div className="p-2">힌트 보러 가기</div>
      </Link> */}
      <div className="flex flex-col gap-2">
        {quiz?.answers.map((v, idx) => (
          <div key={idx} className="p-2 bg-gray-200">
            <Checkbox
              name={`answer-${idx}`}
              value={v}
              checked={selectedValue === v}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            {v}
          </div>
        ))}
      </div>
      <Button
        onClick={() => handleClick(selectedValue)}
        style={{ marginTop: "16px", width: "100%" }}
      >
        정답 제출하기
      </Button>
    </>
  );
};

export default Quiz;
