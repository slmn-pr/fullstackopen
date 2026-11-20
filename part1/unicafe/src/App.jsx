import { useState } from "react";

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    );
};

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistics = (props) => {
    const { good, neutral, bad } = props;

    const all = good + neutral + bad;
    const average = all === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / all;
    const positive = all === 0 ? 0 : (good * 100) / all;

    return (
        <div>
            {all > 0 ? (
                <table>
                    <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />

                        <StatisticLine text="All" value={all} />
                        <StatisticLine text="Average" value={average.toFixed(1)} />
                        <StatisticLine text="Positive" value={`${positive.toFixed(1)} %`} />
                    </tbody>
                </table>
            ) : (
                <>
                    <p>No feedback given</p>
                </>
            )}
        </div>
    );
};

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
                <Button onClick={() => handleFeedback("good")} text="Good" />
                <Button onClick={() => handleFeedback("neutral")} text="Neutral" />
                <Button onClick={() => handleFeedback("bad")} text="Bad" />
            </div>

            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
