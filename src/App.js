import { useState } from "react";
import "./App.css";

import Params from "./Params";
import Game from "./Game"

function App() {
  const [params, setParams] = useState({ min: 0, max: 10, timer: null });
  const [gameStarted, setGameStarted] = useState(false);
  if (!gameStarted)
    return (
      <Params
        params={params}
        setParams={setParams}
        startGame={() => setGameStarted(true)}
      />
    );
  return <Game params={params} endGame={() => setGameStarted(false)} />
}

export default App;
