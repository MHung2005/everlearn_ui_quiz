'use client';

import { Label } from "@/components/ui/label";

export type MyQuestion = {
  question: string;
  options: string[];
  explanation: string;
  answer: string;
};

export default function Question({ question, options, explanation, answer, onAnswer, select, submitted}: MyQuestion & { onAnswer: (value: string) => void } & {select : string | null} & {submitted : boolean}) {
  return (
    <div>
      <form action="">
        <h3>{question}</h3>
        {options.map((option, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <input
              type="radio"
              value={option}
              name={question}
              checked = {select === option}
              onChange={() => {
                onAnswer(option);
              }}
              disabled = {submitted}
            />
            <Label style={{ margin : "5px"}}>{option}</Label>
          </div>
        ))}
      </form>
    </div>
  );
}
