export default function Params({ params, setParams, startGame }) {
  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="min">min</label>
        <input
          type="text"
          value={params.min}
          onChange={({ target }) => setParams({ ...params, min: target.value })}
        />
        <label htmlFor="max">max</label>
        <input
          type="text"
          value={params.max}
          onChange={({ target }) => setParams({ ...params, max: target.value })}
        />
        <label htmlFor="timer">timer</label>
        <input
          type="text"
          value={params.timer}
          onChange={({ target }) => setParams({ ...params, timer: target.value })}
        />
        <button onClick={startGame}>Commencer</button>
      </header>
    </div>
  );
}
