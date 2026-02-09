import React from "react";

function Dashboard({ totalCourses, enrolledCount, progress, openCourses }) {
    return (
        <div>
            <h1>📊 Dashboard</h1>
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

            <button onClick={openCourses}>View Courses</button>
        </div>
    );
}

export default Dashboard;
