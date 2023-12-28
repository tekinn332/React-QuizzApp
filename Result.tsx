import React from 'react';
import { Link } from 'react-router-dom';
export interface ResultPageProps {
  score: number;
  wrong: number;
}

const ResultPage: React.FC<ResultPageProps> = ({ score, wrong }) => {
  return (
    <div>
      <div>
        <p>Wrong Answers: {wrong}</p>
        <p>Right Answers: {score}</p>
         <Link to="/" ><button>Back</button></Link> 
      </div>
    </div>
  );
};

export default ResultPage;

