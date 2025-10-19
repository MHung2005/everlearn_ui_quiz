'use client';

import { Label } from "@/components/ui/label";

export type MyQuestion = {
  question: string;
  options: string[];
  explanation: string;
  answer: string;
};

export default function Question({ question, options, explanation, answer, onAnswer}: MyQuestion & { onAnswer: (value: string) => void }) {
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
              onChange={() => {
                onAnswer(option);
              }}
            />
            <Label style={{ margin : "5px"}}>{option}</Label>
          </div>
        ))}
      </form>
    </div>
  );
}
