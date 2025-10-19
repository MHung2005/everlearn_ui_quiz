'use client';

import { useState, useEffect } from 'react';
import Question from '@/components/ui/Question';
import QuesInfo from '@/components/ui/QuesInfo';
import { Button } from '@/components/ui/button';
import type { MyQuestion } from '@/components/ui/Question';
import './home.css';

// Dữ liệu quiz
const data = {
  "quiz": [
    {
      "question": "Trong bài toán hồi quy, mục tiêu chính của việc học từ dữ liệu là gì?",
      "options": [
        "A. Tìm ra hàm y* kết nối giữa đầu vào x và đầu ra y.",
        "B. Phân loại dữ liệu vào các nhóm khác nhau.",
        "C. Giảm số lượng thuộc tính đầu vào.",
        "D. Tìm ra cấu trúc ẩn trong dữ liệu không nhãn."
      ],
      "answer": "A. Tìm ra hàm y* kết nối giữa đầu vào x và đầu ra y.",
      "explanation": "Mục tiêu của hồi quy là tìm ra hàm y* có thể dự đoán giá trị đầu ra y dựa trên đầu vào x."
    },
    {
      "question": "Mô hình tuyến tính là gì?",
      "options": [
        "A. Một mô hình phức tạp có thể mô tả mọi mối quan hệ giữa các biến.",
        "B. Một mô hình sử dụng siêu phẳng để biểu diễn mối quan hệ giữa đầu vào và đầu ra.",
        "C. Một mô hình chỉ áp dụng cho dữ liệu có cấu trúc cây.",
        "D. Một mô hình không sử dụng trọng số để xác định tầm quan trọng của các thuộc tính."
      ],
      "answer": "B. Một mô hình sử dụng siêu phẳng để biểu diễn mối quan hệ giữa đầu vào và đầu ra.",
      "explanation": "Mô hình tuyến tính sử dụng siêu phẳng (hyperplanes) để biểu diễn mối quan hệ giữa các biến, cho phép dễ dàng xử lý và phân tích."
    },
    {
      "question": "Trong mô hình tuyến tính, thành phần 'độ lệch' (bias) thường được ký hiệu là gì?",
      "options": ["A. w1", "B. wn", "C. w0", "D. wx"],
      "answer": "C. w0",
      "explanation": "Trong mô hình tuyến tính, w0 thường được gọi là độ lệch (bias), nó giúp điều chỉnh đường thẳng hồi quy để phù hợp hơn với dữ liệu."
    },
    {
      "question": "Học có giám sát (Supervised learning) là gì?",
      "options": [
        "A. Học từ dữ liệu không có nhãn.",
        "B. Học từ dữ liệu có nhãn để dự đoán đầu ra cho dữ liệu mới.",
        "C. Học để tìm cấu trúc ẩn trong dữ liệu.",
        "D. Học để tạo ra dữ liệu mới."
      ],
      "answer": "B. Học từ dữ liệu có nhãn để dự đoán đầu ra cho dữ liệu mới.",
      "explanation": "Học có giám sát sử dụng dữ liệu có nhãn (đầu vào và đầu ra tương ứng) để huấn luyện mô hình, sau đó mô hình này có thể dự đoán đầu ra cho dữ liệu mới."
    },
    {
      "question": "Hồi quy (Regression) là gì?",
      "options": [
        "A. Một loại bài toán phân loại.",
        "B. Một loại bài toán học không giám sát.",
        "C. Một loại bài toán trong đó đầu ra là một số thực.",
        "D. Một loại bài toán tìm cấu trúc ẩn trong dữ liệu."
      ],
      "answer": "C. Một loại bài toán trong đó đầu ra là một số thực.",
      "explanation": "Hồi quy là một loại bài toán học có giám sát, trong đó mục tiêu là dự đoán một giá trị số thực (đầu ra liên tục)."
    },
    {
      "question": "Ý nghĩa của việc 'học một mô hình' là gì?",
      "options": [
        "A. Thu thập dữ liệu.",
        "B. Tìm kiếm các tham số phù hợp của mô hình.",
        "C. Xây dựng mô hình trực quan.",
        "D. Viết báo cáo về dữ liệu."
      ],
      "answer": "B. Tìm kiếm các tham số phù hợp của mô hình.",
      "explanation": "Học một mô hình có nghĩa là tìm ra các tham số tối ưu của mô hình đó, sao cho nó có thể dự đoán hoặc mô tả dữ liệu một cách chính xác."
    },
    {
      "question": "Đâu không phải là một ví dụ về ứng dụng của học có giám sát?",
      "options": [
        "A. Dự đoán giá nhà dựa trên diện tích và vị trí.",
        "B. Phân loại email vào hộp thư spam hoặc không spam.",
        "C. Phân cụm khách hàng dựa trên hành vi mua sắm.",
        "D. Nhận diện khuôn mặt trong ảnh."
      ],
      "answer": "C. Phân cụm khách hàng dựa trên hành vi mua sắm.",
      "explanation": "Phân cụm khách hàng dựa trên hành vi mua sắm là một ví dụ về học không giám sát, vì không có nhãn được cung cấp trước."
    },
    {
      "question": "Trong biểu thức dự đoán yx ≅ cx, cx đại diện cho gì?",
      "options": [
        "A. Giá trị đầu vào.",
        "B. Giá trị dự đoán.",
        "C. Giá trị thực tế (nhưng không biết trước cho dữ liệu tương lai).",
        "D. Sai số dự đoán."
      ],
      "answer": "C. Giá trị thực tế (nhưng không biết trước cho dữ liệu tương lai).",
      "explanation": "cx đại diện cho giá trị thực tế của đầu ra, thường không biết trước cho dữ liệu mới, và yx là giá trị dự đoán bởi mô hình."
    },
    {
      "question": "Điều gì xảy ra nếu chúng ta sử dụng n thuộc tính để biểu diễn một điểm x trong không gian?",
      "options": [
        "A. x là một số thực.",
        "B. x là một vectơ trong không gian n chiều.",
        "C. x là một ma trận n x n.",
        "D. x không thể biểu diễn được."
      ],
      "answer": "B. x là một vectơ trong không gian n chiều.",
      "explanation": "Nếu sử dụng n thuộc tính, mỗi điểm x sẽ được biểu diễn bởi một vectơ trong không gian n chiều, với mỗi thuộc tính là một chiều."
    },
    {
      "question": "Phần nào sau đây là đúng về hệ số hồi quy (regression coefficients)?",
      "options": [
        "A. Luôn có giá trị dương.",
        "B. Đo lường mức độ quan trọng của mỗi thuộc tính.",
        "C. Không ảnh hưởng đến độ chính xác của mô hình.",
        "D. Chỉ được sử dụng trong mô hình phi tuyến tính."
      ],
      "answer": "B",
      "explanation": "Hệ số hồi quy (regression coefficients) thể hiện trọng số của mỗi thuộc tính và do đó đo lường mức độ quan trọng của thuộc tính đó đối với kết quả dự đoán."
    }
  ]
};

export default function Home() {
  const [checkSub, setCheckSub] = useState(false);
  const [answered, setAnswered] = useState(Array(data.quiz.length).fill(null));
  const [flag, setFlag] = useState<boolean[]>(Array(data.quiz.length).fill(false));

  useEffect(() => {
    const allNull = answered.every(item => item === null);
    if (allNull === false) {
      localStorage.setItem('quiz-ans', JSON.stringify(answered));
    }
  }, [answered]);

  useEffect(() => {
    const allNull = flag.every(item => item === false);
    if (allNull === false) {
      localStorage.setItem('quiz-flag', JSON.stringify(flag));
    }
  }, [flag])

  useEffect(() => {
    const savedAns = localStorage.getItem('quiz-ans');
    const savedFlag = localStorage.getItem('quiz-flag');
    if (savedAns != null) {
      //console.log(savedAns);
      setAnswered(JSON.parse(savedAns));
    }
    if (savedFlag != null) {
      setFlag(JSON.parse(savedFlag));
    }
  }, []);

  const handleAnswer = (index: number, value: string) => {
    const newAnswer = [...answered];
    newAnswer[index] = value;
    setAnswered(newAnswer);
  };

  const handle = () => {
    setCheckSub(true);
  };

  const handleFlag = (index: number) => {
    const newFlag = [...flag];
    newFlag[index] = !newFlag[index];
    setFlag(newFlag);
  };

  function calculateScore() {
    let score = 0;
    data.quiz.forEach((q, index) => {
      if (answered[index] === q.answer) {
        score++;
      }
    });
    return score;
  }
  function checkAnsCorrect(mySet: MyQuestion, index: number) {
    if (answered[index] === mySet.answer) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <div id="header">
        <h1>EVERLEARN</h1>
      </div>
      <div id="Content">
        <div id = "around-navigation">
          {data.quiz.map((mySet: MyQuestion, index: number) => (
            <button
              key={index}
              style={{ margin: "2px" }}
              className= {`${!checkSub? (flag[index] ? 'flag' : answered[index] ? 'answered' : '') : (checkAnsCorrect(mySet, index) ? "correct-ans":"incorrect-ans")}`}
              onClick={() => {
                document.getElementById(`question-${index}`)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="quiz-content">
          {checkSub && (
            <div className = "Point">
              <h3>Point: {calculateScore()}</h3>
            </div>
          )}

          {data.quiz.map((mySet: MyQuestion, index: number) => (
            <div key={index} className="question-container">
              <div className= {`question-info ${checkSub?"submitted":""} ${checkAnsCorrect(mySet, index)?"correct-ans":"incorrect-ans"}`}>
                <QuesInfo
                  index={index}
                  ans={answered[index]}
                  flagged={flag[index]}
                  onFlag={() => handleFlag(index)}
                />
              </div>
              <div className = "question-detail">
                <Question
                  question={mySet.question}
                  options={mySet.options}
                  explanation={mySet.explanation}
                  answer={mySet.answer}
                  onAnswer={(value) => handleAnswer(index, value)}
                  select = {answered[index]}
                />
                {checkSub && (
                  <ul>
                    <li style={{ color: "rgba(28, 187, 81, 1)" }}>Đáp án là: {mySet.answer}</li>
                    <li style={{ color: "rgba(28, 187, 81, 1)" }}>Explain: {mySet.explanation}</li>
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="submit">
        <Button onClick={handle}>Submit</Button>
      </div>
    </div>
  );
}
