import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="title">Quiz App</div>
      <div className="bannerContainer">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/online-exam-5225483-4369737.png?f=webp"
          alt=""
        />
      </div>
      <div className="bottonContainer">
        <button onClick={() => navigate("/quiz")} className="button">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
