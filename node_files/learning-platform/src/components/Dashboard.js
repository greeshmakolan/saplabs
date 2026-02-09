import React from "react";

function Dashboard({ totalCourses, enrolledCount, progress, openCourses, resetProgress }) {
    return (
        <div>
            <h1>📊 Dashboard</h1>
            <h1>Learning-Platform</h1>
            <div className="stats-grid">
                <div className="stat-box">
                    <h3>Total Courses</h3>
                    <p>{totalCourses}</p>
                </div>
                <div className="stat-box">
                    <h3>Enrolled Courses</h3>
                    <p>{enrolledCount}</p>
                </div>
                <div className="stat-box">
                    <h3>Overall Progress</h3>
                    <p>{progress}%</p>
                </div>
            </div>

            <div className="progress-circle" style={{ "--progress": `${progress * 3.6}deg` }}>
                {progress}%
            </div>

            <button onClick={openCourses} style={{ marginRight: "10px" }}>View Courses</button>
            <button onClick={resetProgress} style={{ background: "#ef4444" }}>Reset Progress</button>
        </div>
    );
}

export default Dashboard;
