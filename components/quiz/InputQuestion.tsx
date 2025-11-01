import { IQuiz } from "@/types/quiz";
import Image from "next/image";
import Link from "next/link";

interface Props {
  quiz: IQuiz | undefined;
  answer: string;
  setAnswer: (value: string) => void;
}

const InputQuestion = ({ quiz, answer, setAnswer }: Props) => {
  return (
    <div className="mt-4 h-full">
      <input
        className="border-b-black border-b-1 w-full text-center text-lg  focus:outline-none p-1"
        maxLength={8}
        placeholder="정답을 입력해주세요"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className="flex flex-row align-center mt-2 justify-center">
        {(quiz?.hint_link || quiz?.hint_explation) && (
          <>
            <Image
              width={24}
              height={24}
              alt="hint"
              src={"/icons/question.svg"}
            />
            {quiz?.hint_link ? (
              <Link href={quiz.hint_link}>
                <div className=" text-primary ml-[4px] underline">
                  {quiz?.hint_explation ?? "힌트 보러 가기"}
                </div>
              </Link>
            ) : (
              quiz?.hint_explation && (
                <div className=" text-primary ml-[4px]">
                  {quiz?.hint_explation}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InputQuestion;
