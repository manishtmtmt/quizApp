import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const VICTORY_MARK = 40;

const Result = () => {
  const { score } = useParams();
  const navigate = useNavigate();

  console.log("\n\n🚀 ~ file: Result.jsx:7 ~ Result ~ score:", score);

  return (
    <div>
      <div className="title">Result: {score}</div>
      <div className="bannerContainer">
        {score >= VICTORY_MARK ? (
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-celebrate-investment-growth-6117148-5042433.png?f=webp"
            alt=""
          />
        ) : (
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/sad-woman-sitting-on-floor-4416176-3675901.png?f=webp"
            alt=""
          />
        )}
      </div>
      <div className="bottonContainer">
        <button onClick={() => navigate("/")} className="button">
          Home
        </button>
      </div>
    </div>
  );
};

export default Result;
