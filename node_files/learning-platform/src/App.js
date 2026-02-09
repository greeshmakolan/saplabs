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
  const [completedQuizzes, setCompletedQuizzes] = useState(
    JSON.parse(localStorage.getItem("completedQuizzes")) || []
  );
  const [lessonScores, setLessonScores] = useState(
    JSON.parse(localStorage.getItem("lessonScores")) || {}
  );

  // Calculate overall progress based on lessons only
  // Total number of lessons + total number of quizzes
  // Total number of lessons
  // Total number of lessons across all courses
  // Total lessons across all courses
  // Calculate total lessons + quizzes for the course
  const totalItems = coursesData.reduce(
    (sum, course) => sum + course.lessons.length * 2, // *2 because each lesson has lesson + quiz
    0
  );

  // Count completed lessons + quizzes
  const completedItems = completedLessons.length + completedQuizzes.length;

  // Overall progress %
  const overallProgress = Math.round((completedItems / totalItems) * 100);
  // Calculates course completion % based on lessons + quizzes
  const getCourseCompletion = (course) => {
    const total = course.lessons.length * 2; // each lesson + quiz counts as 2
    const completed = course.lessons.reduce((count, lesson) => {
      let c = 0;
      if (completedLessons.includes(lesson.id)) c++;      // lesson complete
      if (completedQuizzes.includes(lesson.id)) c++;      // quiz complete
      return count + c;
    }, 0);
    return Math.round((completed / total) * 100);
  };


  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    localStorage.setItem("completedQuizzes", JSON.stringify(completedQuizzes));
    localStorage.setItem("lessonScores", JSON.stringify(lessonScores));
  }, [enrolledCourses, completedLessons, completedQuizzes, lessonScores]);

  // Reset all progress
  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      setEnrolledCourses([]);
      setCompletedLessons([]);
      setCompletedQuizzes([]);
      setLessonScores({});
      localStorage.clear(); // removes everything
    }
  };

  return (
    <div className={`container ${view}-page`}>
      {view === "dashboard" && (
        <Dashboard
          totalCourses={coursesData.length}
          enrolledCount={enrolledCourses.length}
          progress={overallProgress}
          openCourses={() => setView("courses")}
          resetProgress={resetProgress}
        />

      )}


      {view === "courses" && (
        <Courses
          courses={coursesData}
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
          completedLessons={completedLessons}
          completedQuizzes={completedQuizzes}  // ✅ pass this!
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
          completedQuizzes={completedQuizzes}
          onCompleteLesson={(lessonId) => {
            if (!completedLessons.includes(lessonId))
              setCompletedLessons([...completedLessons, lessonId]);
          }}
          onCompleteQuiz={(lessonId) => {
            if (!completedQuizzes.includes(lessonId))
              setCompletedQuizzes([...completedQuizzes, lessonId]);
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
