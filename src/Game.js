import { useEffect, useState } from "react";

import PreviousResults from "./PreviousResults";

function getNewOp(inf, sup) {
  const getRandomNumber = (min, max) =>
    min + Math.floor((1 + max - min) * Math.random());
  const n1 = getRandomNumber(inf, sup);
  const n2 = getRandomNumber(2, 10);

  return { string: `${n1} × ${n2}`, result: n1 * n2 };
}

export default function Game({ params, endGame }) {
  const [answers, setAnswers] = useState([]);
  const [currentOp, setCurrentOp] = useState(getNewOp(params.min, params.max));
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1)
    }, 1000)
    return () => clearTimeout(interval)
  }, [setTimer])

  function checkAnswer() {
    let tempAnswers = []
    if (currentOp.result === currentAnswer) {
      tempAnswers = [...answers.slice(-10), { correct: true, op: currentOp.string, result: currentAnswer }]
    } else {
      tempAnswers = [...answers.slice(-10), { correct: false, op: currentOp.string, result: currentOp.result, answer: currentAnswer }]
    }
    if (tempAnswers.length === 10) return endGame({ results: tempAnswers, timer })
    setAnswers(tempAnswers)
    setCurrentAnswer('')
    setCurrentOp(getNewOp(params.min, params.max))
  }

  function onKeyDown(e) {
    if (e.key !== "Enter") return
    checkAnswer()
  }

  return (
    <>
      <h1>{currentOp.string}</h1>
      <input
        type="number"
        placeholder="Réponse"
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(Number(e.target.value))}
        onKeyDown={onKeyDown}
      />
      <button onClick={checkAnswer}>Valider</button>
      <PreviousResults results={answers} position={"absolute"} />
    </>
  );
}
