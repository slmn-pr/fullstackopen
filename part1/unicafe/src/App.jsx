import { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    function handleFeedback(name = "good") {
        switch (name) {
            case "good":
                setGood((prev) => prev + 1);
                break;
            case "neutral":
                setNeutral((prev) => prev + 1);
                break;

            case "bad":
                setBad((prev) => prev + 1);
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <h1>Give Feedback</h1>

            <div>
                <button onClick={() => handleFeedback("good")}>Good</button>
                <button onClick={() => handleFeedback("neutral")}>Neutral</button>
                <button onClick={() => handleFeedback("bad")}>Bad</button>
            </div>

            <h1>Statistics</h1>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
        </div>
    );
};

export default App;
