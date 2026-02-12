import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

interface Attendance {
  rollNo: string;
  studentName: string;
  subject: string;
  date: string;
  status: 'Present' | 'Absent';
}

interface Student {
  rollNo: string;
  name: string;
  email?: string;
  class?: string;
  photo?: string; // URL or base64
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<!-- HEADER -->
<div class="dashboard-header">
  <h1>Student Dashboard</h1>
  <button class="logout-btn" (click)="logout()">Logout</button>
</div>

<div class="dashboard-container">

  <!-- SIDEBAR -->
  <div class="sidebar">
    <!-- Profile Thumbnail -->
    <div class="sidebar-profile" (click)="activeSection='profile'">
      <img [src]="student?.photo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'" 
           alt="Profile" class="sidebar-photo">
      <h3>{{ student?.name }}</h3>
    </div>

    <!-- Menu -->
    <div class="menu-card" [class.active]="activeSection==='profile'" (click)="changeSection('profile')">Profile</div>
    <div class="menu-card" [class.active]="activeSection==='myAttendance'" (click)="changeSection('myAttendance')">My Attendance</div>
    <div class="menu-card" [class.active]="activeSection==='subjectSummary'" (click)="changeSection('subjectSummary')">Subject-wise</div>
    <div class="menu-card" [class.active]="activeSection==='dateSummary'" (click)="changeSection('dateSummary')">Date-wise</div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="content-panel">

    <!-- PROFILE SECTION -->
    <div *ngIf="activeSection==='profile'" class="form-card" style="text-align:center;">
      <h2>My Profile</h2>
      <img 
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" 
        alt="Profile" 
        class="profile-photo"
      >
      <p><strong>Name:</strong> {{ student?.name }}</p>
      <p><strong>Roll No:</strong> {{ student?.rollNo }}</p>
      <p *ngIf="student?.class"><strong>Class:</strong> {{ student?.class }}</p>
      <p *ngIf="student?.email"><strong>Email:</strong> {{ student?.email }}</p>
    </div>

    <!-- MY ATTENDANCE -->
    <div *ngIf="activeSection==='myAttendance'" class="form-card">
      <h2>Overall Attendance</h2>

      <!-- Filters -->
      <label>Subject:
        <select [(ngModel)]="selectedSubject" (change)="filterOverall()">
          <option value="">All Subjects</option>
          <option *ngFor="let sub of subjects" [value]="sub">{{ sub }}</option>
        </select>
      </label>
      <label style="margin-left:20px;">Date:
        <select [(ngModel)]="selectedDate" (change)="filterOverall()">
          <option value="">All Dates</option>
          <option *ngFor="let d of dates" [value]="d">{{ d }}</option>
        </select>
      </label>

      <!-- Pie Chart -->
      <div style="max-width:400px; margin:20px auto;">
        <canvas #attendancePie></canvas>
      </div>

      <!-- Stats -->
      <p>Total Classes: {{ totalClasses }}</p>
      <p>Present: {{ presentCount }} ({{ presentPercentage }}%)</p>
      <p>Absent: {{ absentCount }} ({{ absentPercentage }}%)</p>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar" [style.width.%]="presentPercentage" [style.background]="getProgressColor(presentPercentage)">
          {{ presentPercentage }}%
        </div>
      </div>
    </div>

    <!-- SUBJECT-WISE -->
    <div *ngIf="activeSection==='subjectSummary'" class="form-card">
      <h2>Subject-wise Attendance</h2>
      <label>Subject:
        <select [(ngModel)]="selectedSubjectSubjectSummary" (change)="filterSubjectSummary()">
          <option value="">All Subjects</option>
          <option *ngFor="let sub of subjects" [value]="sub">{{ sub }}</option>
        </select>
      </label>

      <table *ngIf="subjectSummary.length">
        <tr>
          <th>Subject</th>
          <th>Present</th>
          <th>Absent</th>
          <th>% Present</th>
          <th>Progress</th>
        </tr>
        <tr *ngFor="let sub of subjectSummary">
          <td>{{ sub.subject }}</td>
          <td>{{ sub.present }}</td>
          <td>{{ sub.absent }}</td>
          <td>{{ sub.percentage }}%</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar" [style.width.%]="sub.percentage" [style.background]="getProgressColor(sub.percentage)">
                {{ sub.percentage }}%
              </div>
            </div>
          </td>
        </tr>
      </table>
      <p *ngIf="!subjectSummary.length">No records found for selected filters.</p>
    </div>

    <!-- DATE-WISE -->
    <div *ngIf="activeSection==='dateSummary'" class="form-card">
      <h2>Date-wise Attendance</h2>
      <label>Date:
        <select [(ngModel)]="selectedDateDateSummary" (change)="filterDateSummary()">
          <option value="">All Dates</option>
          <option *ngFor="let d of dates" [value]="d">{{ d }}</option>
        </select>
      </label>

      <table *ngIf="dateSummary.length">
        <tr>
          <th>Date</th>
          <th>Subject</th>
          <th>Status</th>
        </tr>
        <tr *ngFor="let a of dateSummary">
          <td>{{ a.date }}</td>
          <td>{{ a.subject }}</td>
          <td>{{ a.status }}</td>
        </tr>
      </table>
      <p *ngIf="!dateSummary.length">No attendance records for selected date.</p>
    </div>

  </div>
</div>
  `,
  styles: [`
/* HEADER */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: #6b46c1;
  color: white;
  font-size: 22px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.logout-btn {
  background: #9f7aea;
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background: #7c3aed;
}

/* DASHBOARD CONTAINER */
.dashboard-container {
  display: flex;
  min-height: calc(100vh - 70px);
}

/* SIDEBAR */
.sidebar {
  width: 230px;
  background: #5b21b6;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-profile {
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
}

.sidebar-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #d8b4fe;
}

.menu-card {
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.menu-card:hover, .menu-card.active {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

/* CONTENT PANEL */
.content-panel {
  flex: 1;
  padding: 25px 40px;
  background: #f9f7fd;
}

.form-card {
  background: #ffffff;
  padding: 24px 28px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  margin-bottom: 30px;
}

.profile-details img.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #7c3aed;
  display: block;
  margin: 20px auto;
}

/* PROGRESS BAR */
.progress-container {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  height: 18px;
  margin-top: 5px;
}

.progress-bar {
  height: 100%;
  color: #fff;
  font-weight: 500;
  text-align: center;
  line-height: 18px;
  border-radius: 12px;
}

/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 18px;
  font-size: 14px;
}

th, td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #7c3aed;
  color: #ffffff;
  font-weight: 600;
}

/* SELECT */
select, select option {
  background-color: #ffffff !important;
  color: #000000 !important;
}
  `],
  encapsulation: ViewEncapsulation.None
})
export class StudentDashboard implements OnInit, AfterViewInit {
  @ViewChild('attendancePie') attendancePieRef!: ElementRef<HTMLCanvasElement>;
  pieChart: any;

  student: Student | null = null;
  rollNo = '';
  activeSection = 'profile';

  allAttendance: Attendance[] = [];
  subjects: string[] = [];
  dates: string[] = [];

  selectedSubject = '';
  selectedDate = '';
  selectedSubjectSubjectSummary = '';
  selectedDateDateSummary = '';

  totalClasses = 0;
  presentCount = 0;
  absentCount = 0;
  presentPercentage = 0;
  absentPercentage = 0;

  subjectSummary: { subject: string, present: number, absent: number, percentage: number }[] = [];
  dateSummary: Attendance[] = [];

  constructor() { Chart.register(...registerables); }

  ngOnInit() {
    if (typeof window === 'undefined') return;
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!user) return;
    this.rollNo = user.rollNo;
    const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
    this.student = students.find(s => s.rollNo === this.rollNo) || null;
    this.loadAttendance();
  }

  ngAfterViewInit() {
    if (this.activeSection === 'myAttendance') setTimeout(() => this.updatePieChart(), 0);
  }

  changeSection(section: string) {
    this.activeSection = section;
    if (section === 'myAttendance') setTimeout(() => this.updatePieChart(), 0);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }

  filterOverall() {
    let filtered = this.allAttendance;
    if (this.selectedSubject) filtered = filtered.filter(a => a.subject === this.selectedSubject);
    if (this.selectedDate) filtered = filtered.filter(a => a.date === this.selectedDate);

    const total = filtered.length;
    const present = filtered.filter(a => a.status === 'Present').length;
    const absent = total - present;

    this.totalClasses = total;
    this.presentCount = present;
    this.absentCount = absent;
    this.presentPercentage = total ? Math.round(present / total * 100) : 0;
    this.absentPercentage = total ? Math.round(absent / total * 100) : 0;

    setTimeout(() => this.updatePieChart(), 0);
  }

  loadAttendance() {
    this.allAttendance = (JSON.parse(localStorage.getItem('attendance') || '[]') as Attendance[])
      .filter(a => a.rollNo === this.rollNo);
    this.subjects = Array.from(new Set(this.allAttendance.map(a => a.subject))).sort();
    this.dates = Array.from(new Set(this.allAttendance.map(a => a.date))).sort();

    this.filterOverall();
    this.filterSubjectSummary();
    this.filterDateSummary();
  }

  filterSubjectSummary() {
    let filtered = this.allAttendance;
    if (this.selectedSubjectSubjectSummary) filtered = filtered.filter(a => a.subject === this.selectedSubjectSubjectSummary);

    const subjects = Array.from(new Set(filtered.map(a => a.subject)));
    this.subjectSummary = subjects.map(sub => {
      const present = filtered.filter(a => a.subject === sub && a.status === 'Present').length;
      const absent = filtered.filter(a => a.subject === sub && a.status === 'Absent').length;
      const percentage = (present + absent) ? Math.round(present / (present + absent) * 100) : 0;
      return { subject: sub, present, absent, percentage };
    });
  }

  filterDateSummary() {
    this.dateSummary = this.selectedDateDateSummary ?
      this.allAttendance.filter(a => a.date === this.selectedDateDateSummary) :
      [...this.allAttendance];
  }

  getProgressColor(percent: number) { if (percent >= 75) return '#16a34a'; if (percent >= 50) return '#facc15'; return '#dc2626'; }

  updatePieChart() {
    if (!this.attendancePieRef) return;
    if (this.pieChart) this.pieChart.destroy();

    this.pieChart = new Chart(this.attendancePieRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [this.presentCount, this.absentCount],
          backgroundColor: ['#16a34a', '#dc2626']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
}
