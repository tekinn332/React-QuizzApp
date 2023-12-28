import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VscDebugRestart } from "react-icons/vsc";

interface QuestionProps {
  questionText: string;
  onNextQuestion: () => void;
}

const Question: React.FC<QuestionProps> = ({ questionText }) => {
  return (
    <div>
      <h2>{questionText}</h2>
     
    </div>
  );
};

interface Option {
  question: string;
  answers: string[];
  correctAnswer: string;
}


interface QuizProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    wrong: number;
    setWrong: React.Dispatch<React.SetStateAction<number>>;
  }

const QuizApp: React.FC<QuizProps> = ({score, setScore, wrong, setWrong}) => {
  const allQuestions: Option[][] = [
    [
      {
        question: ' 1. React.js nedir?',
        answers: ['Şirket', 'Bir programlama dili', 'Bir çerçeve', 'Bir js kütüphanesi'],
        correctAnswer: 'Bir js kütüphanesi',
      },
      {
        question: '2. Javascript nedir?',
        answers: ['Şirket', 'Bir programlama dili', 'Bir çerçeve', 'Bir js kütüphanesi'],
        correctAnswer: 'Bir programlama dili',
      },
      {
        question: '3. Hangisi bir JavaScript kodu parçasına aittir?',
        answers: [
          'print(hello world)',
          'console.log(hello world)',
          'puts hello world',
          'fmt.Println(hello world)',
        ],
        correctAnswer: 'console.log(hello world)',
      },
      {
        question: '4. CSS nedir?',
        answers: ['Bir programlama dili', 'Bir oyun', 'Bir stil tabanlı dil', 'Bir araba'],
        correctAnswer: 'Bir stil tabanlı dil',
      },
      {
        question: '5. ChatGpt nedir?',
        answers: [
          'Bir telefon',
          'Bir programlama dili',
          'Bir yapay zeka programı (AI)',
          'Bir js kütüphanesi',
        ],
        correctAnswer: 'Bir yapay zeka programı (AI)',
      },
    ],
    // İhtiyaca göre daha fazla soru seti ekleyebilirsiniz
  ];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [timer, setTimer] = useState<number >(30); // 30 saniyelik süre
  const hasMoreQuestions = currentQuestion + 1 < allQuestions[currentSet].length;
  const [finish, setFinish] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0 && selectedAnswer === null) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }


    return () => clearInterval(interval);
  }, [timer, selectedAnswer]);

  useEffect(() => {
    if (timer === 0 && selectedAnswer === null) {
      setWrong((prevWrong) => prevWrong + 1);
     
      
    }
  }, [timer, selectedAnswer]);

  const handleClick = (answer: string) => {
    if (selectedAnswer === null && timer > 0 ) {
      setSelectedAnswer(answer);

      const currentCorrectAnswer = allQuestions[currentSet][currentQuestion]?.correctAnswer;
      
       if (answer === currentCorrectAnswer) {
        setScore((prevScore) => prevScore + 1);
      } else if (answer !== currentCorrectAnswer) {
        setWrong((prevWrong) => prevWrong + 1);
      }
      else if (timer < 1) {
        setSelectedAnswer(answer)
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimer(30); // Soru değiştiğinde süreyi sıfırla
    setShow(false)

    if (currentQuestion + 1 < allQuestions[currentSet].length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setShow(false)
        // Bir sonraki soru varsa, sadece soruyu güncelle
    }
  
  };

  
  const yenidenOyna = () => {
    setSelectedAnswer(null);
    setScore(0);
    setWrong(0);
    setCurrentSet(0);
    setCurrentQuestion(0);
    setFinished(false);
    setTimer(30);
    setShow(false)
  };

 

  const showsureorcancel = () => {
    setShow(true)
  }

  return (
    <div className='thediv' >

      
    
      
      <VscDebugRestart  onClick={showsureorcancel} className='restartbutton' />
      {show && (
        <>
        <button onClick={yenidenOyna} className="surebutton" >Sure</button>
        <button onClick={() =>setShow(false)} className='cancelbutton' >Cancel</button>
        </>
      )}
  <p className='sure' >Left: <span className='timer' >{timer}</span> seconds</p>
      <div className='rightcontainer' ><p className='right' >Right: <span style={{color:"rgb(0, 255, 0)"}} >{score}</span> </p></div>
      <p className='wrong' >Wrong: <span style={{color:"red"}} >{wrong}</span></p>

<Question
  questionText={allQuestions[currentSet][currentQuestion]?.question || ''}
  onNextQuestion={handleNextQuestion}
/>

<div className="answers-container">
  {allQuestions[currentSet][currentQuestion]?.answers.map((answer, index) => (
    <div key={index}>
      <h3
        style={{
          color:
            selectedAnswer !== null || (timer === 0 && selectedAnswer === null)
              ? answer === allQuestions[currentSet][currentQuestion]?.correctAnswer
                ? 'green'
                : 'red'
              : 'black',
        }}
        onClick={() => handleClick(answer)}
      >
        {answer}
      </h3>
    </div>
  ))}
</div>

{hasMoreQuestions && (
  <button onClick={handleNextQuestion} className='nextbutton'>Next</button>
)}

     

<Link to="/resultpage">
  <button className="finishbutton" >Finish</button>
</Link>

</div>

  );
};

export default QuizApp;
