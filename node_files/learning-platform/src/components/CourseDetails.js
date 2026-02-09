import React, { useState, useEffect } from "react";

function CourseDetails({ course, enrolledCourses, completedLessons, onCompleteLesson, back }) {
    const [activeTab, setActiveTab] = useState("lessons"); // "lessons" or "quiz"
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizScore, setQuizScore] = useState(null);

    // Reset quiz when lesson changes
    useEffect(() => {
        setQuizAnswers({});
        setQuizScore(null);
    }, [selectedLesson]);

    if (!enrolledCourses.includes(course.id)) {
        return (
            <div className="card center">
                <h3>🚫 Not Enrolled</h3>
                <p>Please enroll to access this course.</p>
                <button onClick={back}>Go Back</button>
            </div>
        );
    }

    const handleAnswer = (questionId, option) => {
        setQuizAnswers({ ...quizAnswers, [questionId]: option });
    };

    const submitQuiz = () => {
        if (!selectedLesson) return;

        const total = selectedLesson.quiz.length;
        let correct = 0;
        selectedLesson.quiz.forEach(q => {
            if (quizAnswers[q.id] === q.answer) correct++;
        });

        const score = Math.round((correct / total) * 100);
        setQuizScore(score);

        // Mark lesson complete only if score >= 70
        if (score >= 70) {
            onCompleteLesson(selectedLesson.id);
        }
    };

    const retryQuiz = () => {
        setQuizAnswers({});
        setQuizScore(null);
    };

    return (
        <div>
            <button className="back-btn" onClick={back}>⬅ Back</button>
            <h2>{course.title}</h2>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={activeTab === "lessons" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("lessons")}
                >
                    Lessons
                </button>
                <button
                    className={activeTab === "quiz" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("quiz")}
                >
                    Quiz
                </button>
            </div>

            {/* Two-panel layout */}
            <div className="course-content">
                {/* Left Panel */}
                <div className="left-panel">
                    {course.lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className={`lesson-card ${selectedLesson?.id === lesson.id ? "selected" : ""}`}
                            onClick={() => setSelectedLesson(lesson)}
                        >
                            <span>{lesson.title}</span>
                            <span className="badge">
                                {completedLessons.includes(lesson.id) ? "✅" : "❌"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    {activeTab === "lessons" && selectedLesson && (
                        <div className="card lesson-content">
                            <h3>{selectedLesson.title}</h3>
                            <p>{selectedLesson.content}</p>
                        </div>
                    )}
                    {activeTab === "lessons" && !selectedLesson && (
                        <div className="card lesson-content">
                            <p>Select a lesson on the left to view content.</p>
                        </div>
                    )}

                    {activeTab === "quiz" && selectedLesson && (
                        <div className="card lesson-content">
                            <h3>{selectedLesson.title} Quiz</h3>

                            {selectedLesson.quiz.map((q) => (
                                <div key={q.id} className="quiz-question">
                                    <p>{q.question}</p>
                                    {q.options.map((opt) => (
                                        <div
                                            key={opt}
                                            className={`option ${quizAnswers[q.id] === opt ? "selected" : ""}`}
                                            onClick={() => handleAnswer(q.id, opt)}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {!quizScore && (
                                <button onClick={submitQuiz} style={{ marginTop: "15px" }}>
                                    Submit Quiz
                                </button>
                            )}

                            {quizScore !== null && (
                                <div style={{ marginTop: "20px" }}>
                                    <p>
                                        Your Score: <strong>{quizScore}%</strong>
                                    </p>
                                    {quizScore >= 70 ? (
                                        <p className="success">✅ Lesson Completed!</p>
                                    ) : (
                                        <p className="error">❌ Score less than 70. Try again!</p>
                                    )}
                                    <button onClick={retryQuiz}>Retry Quiz</button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "quiz" && !selectedLesson && (
                        <div className="card lesson-content">
                            <p>Select a lesson from the left to take its quiz.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;
