import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/questions`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));
  }, []);

  const handleShowAnswer = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return { ...question, showAnswer: !question.showAnswer }; // Toggle show answer
        }
        return question;
      })
    );
  };

  const handleAddQuestion = () => {
    const questionData = { question: newQuestion, answer: newAnswer };

    fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/questions`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setNewQuestion("");
        setNewAnswer("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1 className="title">Trivia App</h1>
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <h3 className="question">{question.question}</h3>
          {question.showAnswer ? (
            <p className="answer">Answer: {question.answer}</p>
          ) : (
            <button
              className="show-answer-button"
              onClick={() => handleShowAnswer(question.id)}
            >
              Show Answer
            </button>
          )}
        </div>
      ))}

      <div className="add-question-container">
        <input
          type="text"
          placeholder="Enter new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddQuestion} className="add-question-button">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default App;