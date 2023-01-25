export default function PreviousResults({ results, position }) {
  return (
    <div style={{ position, left: "10px", margin: "auto 0" }}>
      {results.map((result) => (
        <ResultLine result={result} />
      ))}
    </div>
  );
}

function ResultLine({ result }) {
  if (result.correct)
    return (
      <p className="green">
        {result.op} = {result.result}
      </p>
    );
  return (
    <p className="red">
      {result.op} ={" "}
      <span style={{ textDecoration: "line-through" }}>{result.answer}</span>{" "}
      {result.result}
    </p>
  );
}
