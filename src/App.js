import dayjs from "dayjs";
import { useState } from "react";
import "./App.css";

import Params from "./Params";
import Game from "./Game"
import Recap from "./Recap";

function App({ bestScores, setBestScores }) {
  const [params, setParams] = useState({ min: 0, max: 10 });
  const [gameStarted, setGameStarted] = useState(false);
  const [recap, setRecap] = useState(null)

  const endGame = ({ results, timer }) => {
    const score = Math.max(0, 100 - timer - 10 * results.filter(r => !r.correct).length)
    const newScores = [...bestScores, { score, date: dayjs().format("DD/MM") }].sort((a, b) => b.score - a.score).slice(0, 3)
    setBestScores(newScores)
    localStorage.setItem('multiplyScores', JSON.stringify(newScores))
    setGameStarted(false)
    setRecap({ results, timer, score })
  }

  if (recap) return <Recap recap={recap} setRecap={setRecap} />
  if (!gameStarted)
    return (
      <Params
        params={params}
        setParams={setParams}
        startGame={() => setGameStarted(true)}
      />
    );
  return <Game params={params} endGame={endGame} />
}

function Layout() {
  const [bestScores, setBestScores] = useState(JSON.parse(localStorage.getItem("multiplyScores")) || [])

  const clearScores = () => {
    localStorage.removeItem("multiplyScores")
    setBestScores([])
  }

  return <div className="App">
    <header className="App-header">
      {bestScores.length > 0 && (<div style={{ position: "absolute", right: "10px", top: "10px" }}>
        Meilleurs scores :
        {bestScores.map(score => <p><b>{score.score}</b> le {score.date}</p>
        )}
        <button onClick={clearScores}>Supprimer les meilleurs scores</button>
      </div>
      )}
      <App bestScores={bestScores} setBestScores={setBestScores} />
    </header>
  </div>
}

export default Layout;
