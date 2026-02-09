import React, { useState } from "react";

function Lesson({ lesson, completedLessons, setCompletedLessons, lessonScores, setLessonScores, back }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(lessonScores[lesson.id] || 0);

    const handleChange = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleSubmit = () => {
        let correct = 0;
        lesson.quiz.forEach((q, i) => {
            if (answers[i] === q.answer) correct++;
        });
        const newScore = Math.round((correct / lesson.quiz.length) * 100);
        setScore(newScore);
        setLessonScores({ ...lessonScores, [lesson.id]: newScore });

        if (newScore >= 70 && !completedLessons.includes(lesson.id)) {
            setCompletedLessons([...completedLessons, lesson.id]);
        }

        setSubmitted(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
    };

    return (
        <div>
            <button className="back-btn" onClick={back}>⬅ Back</button>
            <h2>{lesson.title}</h2>

            {lesson.quiz.map((q, i) => (
                <div key={i} className="card">
                    <p>{i + 1}. {q.question}</p>
                    {q.options.map((opt) => (
                        <div key={opt} className="option">
                            <input
                                type="radio"
                                name={`q-${i}`}
                                checked={answers[i] === opt}
                                onChange={() => handleChange(i, opt)}
                            />
                            {opt}
                        </div>
                    ))}
                </div>
            ))}

            {!submitted ? (
                <button onClick={handleSubmit}>Submit Quiz</button>
            ) : (
                <div>
                    <p className={score >= 70 ? "success" : "error"}>
                        Score: {score}% {score >= 70 ? "🎉 Passed" : "❌ Try Again"}
                    </p>
                    {score < 70 && <button onClick={handleRetry}>Retry Quiz</button>}
                </div>
            )}
        </div>
    );
}

export default Lesson;
