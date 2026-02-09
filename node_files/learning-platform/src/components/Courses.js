import React from "react";

function Courses({
    courses,
    enrolledCourses,
    setEnrolledCourses,
    completedLessons = [],       // default empty array
    completedQuizzes = [],       // default empty array
    onSelectCourse,
    back,
}) {
    const enrollCourse = (courseId) => {
        if (!enrolledCourses.includes(courseId)) {
            setEnrolledCourses([...enrolledCourses, courseId]);
        }
    };

    // Calculate course completion based on both lessons and quizzes
    const getCourseCompletion = (course) => {
        const totalItems = course.lessons.length * 2; // each lesson + quiz
        const completedItems = course.lessons.reduce((count, lesson) => {
            let c = 0;
            if (completedLessons.includes(lesson.id)) c++;   // lesson completed
            if (completedQuizzes.includes(lesson.id)) c++;   // quiz completed
            return count + c;
        }, 0);
        return Math.round((completedItems / totalItems) * 100);
    };

    return (
        <div>
            <button className="back-btn" onClick={back}>
                ⬅ Back
            </button>
            <h2>📚 Available Courses</h2>

            {courses.map((course) => {
                const progressPercent = getCourseCompletion(course);

                return (
                    <div
                        key={course.id}
                        className="card course-card"
                        style={{ borderLeftColor: course.color }}
                    >
                        <div className="course-header">
                            <h3 style={{ color: "#1e293b" }}>{course.title}</h3>
                            {enrolledCourses.includes(course.id) ? (
                                <span className="badge">✅ Enrolled</span>
                            ) : (
                                <button onClick={() => enrollCourse(course.id)}>Enroll</button>
                            )}
                        </div>

                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                        <p>{progressPercent}% completed</p>

                        {enrolledCourses.includes(course.id) && (
                            <button
                                style={{ marginTop: "10px" }}
                                onClick={() => onSelectCourse(course)}
                            >
                                Open Course
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Courses;
