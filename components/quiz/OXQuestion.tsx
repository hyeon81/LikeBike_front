import { IQuiz } from "@/types/quiz";

interface Props {
  quiz: IQuiz | undefined;
  answer: string;
  setAnswer: (value: string) => void;
}

interface OXCardProps {
  isSelected: boolean;
  label: string;
  onSelect: (value: string) => void;
  selectedColor: "primary" | "error";
}

const OXCard = ({
  isSelected,
  label,
  onSelect,
  selectedColor,
}: {
  onSelect: (value: string) => void;
  isSelected: boolean;
  label: string;
  selectedColor: "primary" | "error";
}) => {
  return (
    <div
      className={`text-[160px] font-medium w-[200px] h-[240px] border-[1.5px] rounded-2xl flex items-center justify-center ${isSelected ? `border-${selectedColor}` : "border-gray-medium"} bg-yellow pb-[8px] ${isSelected ? `text-${selectedColor}` : "text-gray-medium"} cursor-pointer`}
      style={{
        lineHeight: "200px",
      }}
      onClick={() => onSelect(label)}
    >
      {label}
    </div>
  );
};

const OXQuestion = ({ quiz, answer, setAnswer }: Props) => {
  return (
    <div className="flex flex-row gap-4">
      <OXCard
        isSelected={answer === "O"}
        label="O"
        onSelect={setAnswer}
        selectedColor="primary"
      />
      <OXCard
        isSelected={answer === "X"}
        label="X"
        onSelect={setAnswer}
        selectedColor="error"
      />
    </div>
  );
};

export default OXQuestion;
