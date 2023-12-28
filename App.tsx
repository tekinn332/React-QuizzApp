// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import QuizApp from './Quiz';
import ResultPage from './Result';

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/QuizApp"
          element={<QuizApp score={score} setScore={setScore} wrong={wrong} setWrong={setWrong} />}
        />
        <Route
          path="/ResultPage"
          element={<ResultPage score={score} wrong={wrong} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
