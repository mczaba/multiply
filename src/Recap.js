import PreviousResults from "./PreviousResults"

export default function Recap({ recap, setRecap }) {
    return (
        <div>
            <h3>Tu as fait {recap.results.filter(r => r.correct).length} bonnes réponses en {recap.timer} secondes.</h3>
            <h3>Cela correspond à un score de {recap.score}.</h3>
            <PreviousResults results={recap.results} position={"relative"} />
            <button onClick={() => setRecap(null)}>Continuer</button>
        </div>
    )
}