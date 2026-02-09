import { useState } from "react";

function Quiz({ quiz, markCompleted }) {
    const [selected, setSelected] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const submitQuiz = () => {
        setSubmitted(true);
        if (selected === quiz.answer) {
            markCompleted();
        }
    };

    return (
        <div>
            <p>{quiz.question}</p>
            {quiz.options.map(opt => (
                <label key={opt}>
                    <input
                        type="radio"
                        value={opt}
                        onChange={() => setSelected(opt)}
                    />
                    {opt}
                </label>
            ))}

            <br />
            <button onClick={submitQuiz}>Submit Quiz</button>

            {submitted && (
                <p>
                    {selected === quiz.answer ? "✅ Correct!" : "❌ Wrong Answer"}
                </p>
            )}
        </div>
    );
}

export default Quiz;
