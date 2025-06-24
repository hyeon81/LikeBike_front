import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Correct from "./Correct";
import Wrong from "./Wrong";

interface QuizElementProps {
  question: string;
  options: { id: string; text: string }[];
  answer: string;
}

export const QuizElement = ({
  question,
  options,
  answer,
}: QuizElementProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const handleClick = () => {
    console.log("선택한 값:", selectedValue);
    if (selectedValue === answer) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  if (correct === true) {
    return <Correct />;
  } else if (correct === false) {
    return <Wrong />;
  }

  return (
    <div>
      <div>{question}</div>
      <Image
        src="/quiz/quiz1.png"
        alt="Quiz Image"
        width={500}
        height={300}
        style={{ borderRadius: "8px", margin: "16px 0" }}
      />
      <FormControl>
        <RadioGroup
          name="quiz1"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {options.map((v) => {
            return (
              <FormControlLabel
                key={v.id}
                value={v.id}
                control={<Radio />}
                label={v.text}
              />
            );
          })}
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ marginTop: "16px" }}
        >
          제출
        </Button>
      </FormControl>
    </div>
  );
};
