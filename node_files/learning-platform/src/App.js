import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import Lesson from "./components/Lesson";
import coursesData from "./data/coursesData";
import "./App.css";

function App() {
  const [view, setView] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [enrolledCourses, setEnrolledCourses] = useState(
    JSON.parse(localStorage.getItem("enrolledCourses")) || []
  );
  const [completedLessons, setCompletedLessons] = useState(
    JSON.parse(localStorage.getItem("completedLessons")) || []
  );
  const [lessonScores, setLessonScores] = useState(
    JSON.parse(localStorage.getItem("lessonScores")) || {}
  );

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    localStorage.setItem("lessonScores", JSON.stringify(lessonScores));
  }, [enrolledCourses, completedLessons, lessonScores]);

  const totalLessons = coursesData.reduce((sum, c) => sum + c.lessons.length, 0);
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className={`container ${view}-page`}>
      {view === "dashboard" && (
        <Dashboard
          totalCourses={coursesData.length}
          enrolledCount={enrolledCourses.length}
          progress={overallProgress}
          openCourses={() => setView("courses")}
        />
      )}

      {view === "courses" && (
        <Courses
          courses={coursesData}
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
          completedLessons={completedLessons}
          onSelectCourse={(course) => {
            setSelectedCourse(course);
            setView("course");
          }}
          back={() => setView("dashboard")}
        />
      )}

      {view === "course" && selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          enrolledCourses={enrolledCourses}
          completedLessons={completedLessons}
          onOpenLesson={(lesson) => {
            setSelectedLesson(lesson);
            setView("lesson");
          }}
          back={() => setView("courses")}
        />
      )}

      {view === "lesson" && selectedLesson && (
        <Lesson
          lesson={selectedLesson}
          completedLessons={completedLessons}
          setCompletedLessons={setCompletedLessons}
          lessonScores={lessonScores}
          setLessonScores={setLessonScores}
          back={() => setView("course")}
        />
      )}
    </div>
  );
}

export default App;
