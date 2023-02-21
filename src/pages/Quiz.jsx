import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CORRECT_MARK = 10;
let score = 0;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [clickOption, setClickOption] = useState(false);

  const navigate = useNavigate();

  const getOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers, _question.correct_answer];
    shuffle(options);
    return options;
  };

  const fetchQuestions = async () => {
    const url =
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=url3986";
    const response = await fetch(url);
    const data = await response.json();
    setQuestions([...data.results]);
    setOptions(getOptionsAndShuffle(data.results[questionNo]));
  };

  const handleNextClick = () => {
    if (questionNo === 9) return;
    setQuestionNo(questionNo + 1);
    setOptions(getOptionsAndShuffle(questions[questionNo + 1]));
    setSelectedOption(null);
    setClickOption(false);
  };

  const handleSkipClick = () => {
    if (questionNo === 9) return;
    setQuestionNo(questionNo + 1);
    setOptions(getOptionsAndShuffle(questions[questionNo + 1]));
    setSelectedOption(null);
    setClickOption(false);
  };

  const handleClickOption = (index, option) => {
    if (clickOption) return;
    else {
      setClickOption(true);
      if (option === questions[questionNo].correct_answer)
        score += CORRECT_MARK;
      setSelectedOption(index);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <div className="quizContainer">
      <div className="question">
        {/* render questions */}
        {questions.length > 0 && (
          <h2>{`Q${questionNo + 1}. ${decodeURIComponent(
            questions[questionNo].question
          )}`}</h2>
        )}
      </div>
      <div className="optionsContainer">
        {/* render options */}
        {options.length > 0 &&
          options.map((option, index) => (
            <div
              className={
                index === selectedOption ? "option correctOption" : "option"
              }
              key={index}
              onClick={() => handleClickOption(index, option)}
            >
              {decodeURIComponent(option)}
            </div>
          ))}
      </div>
      <div className="bottomContainer">
        <div>
          <button
            disabled={questionNo === 9}
            onClick={handleSkipClick}
            className="button"
          >
            SKIP
          </button>
        </div>
        {questionNo === 9 ? (
          <div>
            <button
              onClick={() => navigate(`/result/${score}`)}
              className="button"
            >
              RESULT
            </button>
          </div>
        ) : (
          <div>
            <button
              disabled={!clickOption}
              onClick={handleNextClick}
              className="button"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
