import React, { useState, useEffect } from "react";
import "./App.css";


const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome"], answer: "Paris" },
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
  { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
  { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Charles Dickens", "Mark Twain"], answer: "Shakespeare" },
  { question: "What is the boiling point of water?", options: ["100°C", "0°C", "50°C"], answer: "100°C" },
  { question: "What is 10 x 10?", options: ["100", "10", "1000"], answer: "100" },
  { question: "What year did Nigeria gain independence?", options: ["1960", "1957", "1970"], answer: "1960" },
  { question: "Which language runs in the browser?", options: ["JavaScript", "Python", "Java"], answer: "JavaScript" },
  { question: "Which is a front-end framework?", options: ["React", "Express", "MongoDB"], answer: "React" },
  { question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style Sheet", "Computer Style Sheet"], answer: "Cascading Style Sheets" },
  { question: "What is the square root of 144?", options: ["12", "14", "16"], answer: "12" },
  { question: "How many continents are there?", options: ["7", "5", "6"], answer: "7" },
  { question: "What is the currency of Japan?", options: ["Yen", "Won", "Dollar"], answer: "Yen" },
  { question: "Which organ pumps blood?", options: ["Heart", "Lungs", "Liver"], answer: "Heart" },
  { question: "2 + 2 x 2 = ?", options: ["6", "8", "10"], answer: "6" },
  { question: "What is the capital of Ghana?", options: ["Accra", "Kumasi", "Lagos"], answer: "Accra" },
  { question: "Which animal is known as the King of the Jungle?", options: ["Lion", "Tiger", "Elephant"], answer: "Lion" },
  { question: "Which element has symbol O?", options: ["Oxygen", "Gold", "Silver"], answer: "Oxygen" },
  { question: "Which day comes after Friday?", options: ["Saturday", "Sunday", "Thursday"], answer: "Saturday" },
  { question: "How many hours are in a day?", options: ["24", "12", "48"], answer: "24" },
  { question: "What gas do humans breathe in?", options: ["Oxygen", "Carbon", "Nitrogen"], answer: "Oxygen" },
  { question: "Which is not a programming language?", options: ["Banana", "JavaScript", "Python"], answer: "Banana" },
  { question: "What color is the sun?", options: ["Yellow", "Red", "Blue"], answer: "Yellow" },
  { question: "What is used to style web pages?", options: ["CSS", "HTML", "SQL"], answer: "CSS" },
  { question: "What comes after 99?", options: ["100", "101", "98"], answer: "100" }
];

function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    if (started && !showResult) {
      if (timer === 0) {
        handleTimeout();
      }

      const countdown = setInterval(() => {
        setTimer(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer, started, showResult]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const handleTimeout = () => {
    nextQuestion();
  };

  const nextQuestion = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setTimer(15); 
    } else {
      setShowResult(true);
    }
  };

  const startQuiz = () => {
    setStarted(true);
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setTimer(15);
  };

  return (
    <div className="app">
      <h1>Bridget Quiz App ⏳</h1>

      {!started ? (
        <button onClick={startQuiz}>Start Quiz</button>
      ) : showResult ? (
        <div className="result">
          <h2>Quiz Completed ✅</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={startQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="quiz">
          <h3>Time Left: {timer}s</h3>
          <h2>{questions[current].question}</h2>
          <div className="options">
            {questions[current].options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(option)}>{option}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
