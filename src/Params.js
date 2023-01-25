export default function Params({ params, setParams, startGame }) {
  return (
    <>
      <label htmlFor="min">min</label>
      <input
        type="text"
        value={params.min}
        onChange={({ target }) => setParams({ ...params, min: Number(target.value) })}
      />
      <label htmlFor="max">max</label>
      <input
        type="text"
        value={params.max}
        onChange={({ target }) => setParams({ ...params, max: Number(target.value) })}
      />
      <button onClick={startGame}>Commencer</button>
    </>
  );
}
