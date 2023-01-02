import { useEffect, useState } from "react";

import PreviousResults from "./PreviousResults";

function getNewOp(min, max) {
  const getRandomNumber = () =>
    min + Math.floor((1 + max - min) * Math.random());
  const n1 = getRandomNumber();
  const n2 = getRandomNumber();

  return { string: `${n1} × ${n2}`, result: n1 * n2 };
}

export default function Game({ params, endGame }) {
  const [answers, setAnswers] = useState([]);
  const [currentOp, setCurrentOp] = useState(getNewOp(params.min, params.max));
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timer, setTimer] = useState(params.timer)

  useEffect(() => {
    if (timer == null) return
    const to = setTimeout(() => {
        if (timer === 1) return checkAnswer()
        setTimer(timer - 1)
    },1000)
    return () => clearTimeout(to)
  },[timer, setTimer])

  function checkAnswer() {
    if (currentOp.result === currentAnswer) {
        setAnswers([...answers.slice(-10), {correct: true, op: currentOp.string, result: currentAnswer}])
    } else {
        setAnswers([...answers.slice(-10), {correct: false, op: currentOp.string, result: currentOp.result, answer: currentAnswer}])
    }
    setCurrentAnswer('')
    setCurrentOp(getNewOp(params.min, params.max))
    setTimer(params.timer)
  }

  function onKeyDown(e) {
    if (e.key !== "Enter") return
    checkAnswer()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{currentOp.string}</h1>
        <input
          type="number"
          placeholder="Réponse"
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(Number(e.target.value))}
          onKeyDown={onKeyDown}
        />
        <button onClick={checkAnswer}>Valider</button>
        {timer && <p>{timer}s</p>}
        <PreviousResults results={answers} />
      </header>
    </div>
  );
}
