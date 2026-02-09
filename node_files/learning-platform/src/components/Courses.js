import React from "react";

function Courses({ courses, enrolledCourses, setEnrolledCourses, completedLessons, onSelectCourse, back }) {
    const enrollCourse = (courseId) => {
        if (!enrolledCourses.includes(courseId)) {
            setEnrolledCourses([...enrolledCourses, courseId]);
        }
    };

    return (
        <div>
            <button className="back-btn" onClick={back}>⬅ Back</button>
            <h2>📚 Available Courses</h2>

            {courses.map((course) => {
                const lessonsCompleted = course.lessons.filter(lesson => completedLessons.includes(lesson.id)).length;
                const progressPercent = Math.round((lessonsCompleted / course.lessons.length) * 100);

                return (
                    <div key={course.id} className="card course-card" style={{ borderLeftColor: course.color }}>
                        <div className="course-header">
                            <h3 style={{ color: "#1e293b" }}>{course.title}</h3>
                            {enrolledCourses.includes(course.id) ? (
                                <span className="badge">✅ Enrolled</span>
                            ) : (
                                <button onClick={() => enrollCourse(course.id)}>Enroll</button>
                            )}
                        </div>

                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p>{progressPercent}% completed</p>

                        {enrolledCourses.includes(course.id) && (
                            <button style={{ marginTop: "10px" }} onClick={() => onSelectCourse(course)}>
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
