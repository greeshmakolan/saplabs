import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterModule],
    template: `
    <div class="dashboard-container">

      <!-- Header -->
      <header class="dashboard-header">
        <h1>College Attendance System</h1>
        <div class="header-right">
          <a routerLink="/login" class="nav-btn">Login</a>
          <a routerLink="/register" class="nav-btn">Register</a>
        </div>
      </header>

      <!-- Full Page Image -->
      <div class="image-section">
        <img src="https://c8.alamy.com/comp/2JG544P/visit-report-text-on-notebook-wooden-doll-on-blue-background-2JG544P.jpg" 
             alt="Jeep Dashboard" />

        <!-- Buttons overlay on bottom of image -->
        <div class="image-buttons">
          <a routerLink="/student-dashboard" class="btn student-btn">Student Dashboard</a>
          <a routerLink="/faculty-dashboard" class="btn faculty-btn">Faculty Dashboard</a>
        </div>
      </div>

    </div>
  `,
    styles: [`
    /* Full screen container */
    .dashboard-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow: hidden; /* Prevent scrolling */
    }

    /* Header */
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 50px;
      background-color: rgba(0,0,0,0.6);
      color: white;
      height: 80px; /* Fixed header height */
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .dashboard-header h1 {
      font-size: 2rem;
      margin: 0;
      text-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    }

    .header-right {
      display: flex;
      gap: 15px;
    }

    .nav-btn {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      transition: 0.3s;
    }

    .nav-btn:hover {
      background-color: #0056b3;
    }

    /* Image section fills remaining space */
    .image-section {
      position: relative;
      height: calc(100vh - 80px); /* Full viewport minus header */
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .image-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.8);
      transition: transform 0.3s;
    }

    .image-section img:hover {
      transform: scale(1.02);
    }

    /* Buttons overlay on bottom of image */
    .image-buttons {
      position: absolute;
      bottom: 40px;
      display: flex;
      gap: 20px;
      justify-content: center;
      width: 100%;
      flex-wrap: wrap;
    }

    .btn {
      padding: 15px 30px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
      text-decoration: none;
      transition: all 0.3s;
      color: white;
    }

    .student-btn { background-color: #28a745; }
    .student-btn:hover { background-color: #1e7e34; }

    .faculty-btn { background-color: #ffc107; color: #333; }
    .faculty-btn:hover { background-color: #e0a800; }

    /* Responsive */
    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        height: auto;
      }
      .dashboard-header h1 { font-size: 1.5rem; }
      .header-right { flex-wrap: wrap; gap: 10px; }
      .image-buttons { flex-direction: column; gap: 15px; bottom: 20px; }
      .image-section { height: calc(100vh - 80px); }
    }
  `]
})
export class Dashboard { }
