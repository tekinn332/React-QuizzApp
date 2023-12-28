import Quiz from "./Result";
import {Router, Routes, Route, Link} from "react-router-dom"
import QuizApp from "./Quiz";
import ResultPage from "./Result";
function Home() {
    return (
      <>
      <h1 className="title" >Welcome To Test</h1>
      <div className="startscreen">
        <h3 className="clicktostart" >click to start</h3>
        <Link to="/QuizApp" ><div className="startdiv" ><button className="start" >Start</button></div></Link>
      </div>
      </>
    );
  }
  
  export default Home;
  