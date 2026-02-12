import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  rollNo: string;
  name: string;
  class?: string;
  email?: string;
}

interface Subject {
  subjectName: string;
  facultyName: string;
}

interface Attendance {
  rollNo: string;
  studentName: string;
  subject: string;
  date: string;
  status: 'Present' | 'Absent';
}

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="dashboard-container">

  <!-- LEFT MENU -->
  <div class="card-menu">
    <div class="menu-card" [class.active]="activeSection==='profile'" (click)="activeSection='profile'">Profile</div>
    <div class="menu-card" [class.active]="activeSection==='addStudent'" (click)="activeSection='addStudent'">Add Student</div>
    <div class="menu-card" [class.active]="activeSection==='addSubject'" (click)="activeSection='addSubject'">Add Subject</div>
    <div class="menu-card" [class.active]="activeSection==='markAttendance'" (click)="activeSection='markAttendance'">Mark Attendance</div>
    <div class="menu-card" [class.active]="activeSection==='studentOverview'" (click)="activeSection='studentOverview'">Students Overview</div>
    <div class="menu-card" [class.active]="activeSection==='attendanceList'" (click)="activeSection='attendanceList'">Manage Attendance</div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="content-panel">
    <button class="back-btn" *ngIf="activeSection" (click)="activeSection='profile'">⬅ Back</button>
    <!-- PROFILE SECTION -->
<div *ngIf="activeSection==='profile'" class="form-card" style="text-align:center; max-width:400px; margin:40px auto;">
  <h2>My Profile</h2>
  <img [src]="user?.photo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'" 
       alt="Profile" class="profile-photo">
  <p><strong>Name:</strong> {{ user?.username}}</p>
</div>


    <!-- ADD STUDENT -->
    <form *ngIf="activeSection==='addStudent'" class="form-card" (ngSubmit)="saveStudent()">
      <h2>{{ editStudentMode ? 'Edit Student' : 'Add Student' }}</h2>
      <label>Name</label>
      <input type="text" [(ngModel)]="newStudent.name" name="name" required>
      <label>Roll No</label>
      <input type="text" [(ngModel)]="newStudent.rollNo" name="roll" [readonly]="editStudentMode" required>
      <label>Class</label>
      <input type="text" [(ngModel)]="newStudent.class" name="class">
      <label>Email</label>
      <input type="email" [(ngModel)]="newStudent.email" name="email">
      <button type="submit">{{ editStudentMode ? 'Update' : 'Add' }}</button>
      <button type="button" *ngIf="editStudentMode" (click)="cancelEdit()">Cancel</button>
    </form>

    <!-- ADD SUBJECT -->
    <form *ngIf="activeSection==='addSubject'" class="form-card" (ngSubmit)="saveSubject()">
      <h2>Add Subject</h2>
      <label>Subject</label>
      <input type="text" [(ngModel)]="newSubject.subjectName" name="subject" required>
      <label>Faculty</label>
      <input type="text" [(ngModel)]="newSubject.facultyName" name="faculty" required>
      <button type="submit">Save</button>
    </form>

    <!-- MARK ATTENDANCE -->
    <form *ngIf="activeSection==='markAttendance'" class="form-card" (ngSubmit)="saveAttendance()">
      <h2>Mark Attendance</h2>
      <label>Student</label>
      <select [(ngModel)]="selectedStudentRoll" name="student" required>
        <option value="">Select Student</option>
        <option *ngFor="let s of students" [value]="s.rollNo">{{ s.name }}</option>
      </select>
      <label>Subject</label>
      <select [(ngModel)]="selectedSubjectName" name="subject" required>
        <option value="">Select Subject</option>
        <option *ngFor="let sub of subjects" [value]="sub.subjectName">{{ sub.subjectName }}</option>
      </select>
      <label>Date</label>
      <input type="date" [(ngModel)]="attendanceDate" name="date">
      <label>Status</label>
      <select [(ngModel)]="attendanceStatus" name="status">
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit">Save</button>
    </form>

    <!-- STUDENT OVERVIEW -->
    <div *ngIf="activeSection==='studentOverview'" class="form-card">
      <h2>Students Overview</h2>
      <label>Filter by Student</label>
      <select [(ngModel)]="studentFilter">
        <option value="">All Students</option>
        <option *ngFor="let s of students" [value]="s.rollNo">{{ s.name }}</option>
      </select>

      <table>
        <tr>
          <th>Name</th><th>Roll</th><th>Total</th><th>Present</th><th>%</th><th>Action</th>
        </tr>
        <tr *ngFor="let s of filteredStudents">
          <td>{{ s.name }}</td>
          <td>{{ s.rollNo }}</td>
          <td>{{ getTotalClasses(s.rollNo) }}</td>
          <td>{{ getPresentCount(s.rollNo) }}</td>
          <td>{{ getAverageAttendance(s.rollNo) }}%</td>
          <td>
            <button (click)="editStudentRecord(s)">Edit</button>
            <button (click)="deleteStudentRecord(s)">Delete</button>
          </td>
        </tr>
      </table>
    </div>

    <!-- ATTENDANCE LIST -->
    <div *ngIf="activeSection==='attendanceList'" class="form-card">
      <h2>Manage Attendance</h2>
      <label>Filter by Student</label>
      <select [(ngModel)]="attendanceStudentFilter">
        <option value="">All Students</option>
        <option *ngFor="let s of students" [value]="s.rollNo">{{ s.name }}</option>
      </select>
      <label>Filter by Subject</label>
      <select [(ngModel)]="attendanceSubjectFilter">
        <option value="">All Subjects</option>
        <option *ngFor="let sub of subjects" [value]="sub.subjectName">{{ sub.subjectName }}</option>
      </select>

      <table>
        <tr>
          <th>Name</th><th>Subject</th><th>Date</th><th>Status</th>
        </tr>
        <tr *ngFor="let a of filteredAttendance">
          <td>{{ a.studentName }}</td>
          <td>{{ a.subject }}</td>
          <td>{{ a.date }}</td>
          <td>{{ a.status }}</td>
        </tr>
      </table>
    </div>

  </div>
</div>
`,
  styles: [`
/* =========================
   GLOBAL
========================= */
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f2f5;
  color: #1f2937;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
}

/* =========================
   LEFT MENU
========================= */
.card-menu {
  width: 230px;
  background: #1f2937;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
}

.menu-card {
  padding: 15px 20px;
  margin: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.menu-card:hover {
  background: linear-gradient(90deg, #fb923c, #f59e0b);
  color: #ffffff;
}

.menu-card.active {
  background: linear-gradient(90deg, #f97316, #facc15);
  font-weight: 600;
}

/* =========================
   RIGHT PANEL
========================= */
.content-panel {
  flex: 1;
  padding: 25px 40px;
  background: #f9fafb;
  overflow-x: auto;
}

.back-btn {
  background: #f97316;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-btn:hover {
  background: #fb923c;
}

 .profile-photo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #f97316;
      display: block;
      margin: 20px auto;
    }
    p {
      font-size: 18px;
      margin-top: 10px;
    }

/* =========================
   FORM CARD
========================= */
.form-card {
  background: #ffffff;
  padding: 22px 26px;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.form-card h2 {
  margin-top: 0;
  color: #f97316;
}

.form-card label {
  display: block;
  margin: 12px 0 6px;
  font-weight: 500;
}

.form-card input,
.form-card select {
  width: 100%;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-bottom: 16px;
  font-size: 14px;
  background: #ffffff;
  color: #000000;
}

/* =========================
   BUTTONS
========================= */
.form-card button {
  background: #f97316;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 10px;
}

.form-card button:hover {
  background: #fb923c;
}

.edit-btn {
  background: #3b82f6;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
}

.delete-btn {
  background: #ef4444;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
}

/* =========================
   TABLE
========================= */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 18px;
  font-size: 14px;
}

table th,
table td {
  padding: 12px 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

table th {
  background: #f97316;
  color: #ffffff;
  font-weight: 600;
}

/* ❌ Removed row hover to avoid dropdown text issue */
/* table tr:hover { background: #fef3c7; } */

/* =========================
   DROPDOWN FIX
========================= */
select,
select option {
  background-color: #ffffff !important;
  color: #000000 !important;
}

table tr:hover select,
table tr:hover option {
  background-color: #ffffff !important;
  color: #000000 !important;
}

select {
  position: relative;
  z-index: 9999;
  appearance: auto;
}

::ng-deep select,
::ng-deep option {
  background-color: #ffffff !important;
  color: #000000 !important;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column;
  }

  .card-menu {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
  }

  .menu-card {
    flex: 0 0 auto;
    margin: 6px;
  }

  .content-panel {
    padding: 18px 20px;
  }
}

  `],
  encapsulation: ViewEncapsulation.None
})
export class FacultyDashboard implements OnInit {

  students: Student[] = [];
  subjects: Subject[] = [];
  attendanceList: Attendance[] = [];

  newStudent: Partial<Student> = {};
  newSubject: Partial<Subject> = {};

  selectedStudentRoll = '';
  selectedSubjectName = '';
  attendanceDate = new Date().toISOString().split('T')[0];
  attendanceStatus: 'Present' | 'Absent' = 'Present';
  user: any = null;

  activeSection = 'profile';
  editStudentMode = false;

  // Filters
  studentFilter = '';
  attendanceStudentFilter = '';
  attendanceSubjectFilter = '';

  ngOnInit() {
    if (typeof window !== 'undefined') {  // ✅ check if browser
      this.students = this.getStorage('students');
      this.subjects = this.getStorage('subjects');
      this.attendanceList = this.getStorage('attendance');
      this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    }
  }

  private getStorage(key: string) {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  private setStorage(key: string, data: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  saveStudent() {
    if (this.editStudentMode) {
      const i = this.students.findIndex(s => s.rollNo === this.newStudent.rollNo);
      if (i > -1) this.students[i] = this.newStudent as Student;
      this.editStudentMode = false;
    } else {
      this.students.push(this.newStudent as Student);
    }
    this.setStorage('students', this.students);
    this.newStudent = {};
  }

  editStudentRecord(s: Student) {
    this.newStudent = { ...s };
    this.editStudentMode = true;
    this.activeSection = 'addStudent';
  }

  deleteStudentRecord(s: Student) {
    this.students = this.students.filter(st => st.rollNo !== s.rollNo);
    this.attendanceList = this.attendanceList.filter(a => a.rollNo !== s.rollNo);
    this.setStorage('students', this.students);
    this.setStorage('attendance', this.attendanceList);
  }

  cancelEdit() {
    this.editStudentMode = false;
    this.newStudent = {};
  }

  saveSubject() {
    this.subjects.push(this.newSubject as Subject);
    this.setStorage('subjects', this.subjects);
    this.newSubject = {};
  }

  saveAttendance() {
    const student = this.students.find(s => s.rollNo === this.selectedStudentRoll);
    if (!student) return;

    this.attendanceList.push({
      rollNo: student.rollNo,
      studentName: student.name!,
      subject: this.selectedSubjectName,
      date: this.attendanceDate,
      status: this.attendanceStatus
    });

    this.setStorage('attendance', this.attendanceList);

    this.selectedStudentRoll = '';
    this.selectedSubjectName = '';
    this.attendanceStatus = 'Present';
  }

  getTotalClasses(rollNo: string) {
    return this.attendanceList.filter(a => a.rollNo === rollNo).length;
  }

  getPresentCount(rollNo: string) {
    return this.attendanceList.filter(a => a.rollNo === rollNo && a.status === 'Present').length;
  }

  getAverageAttendance(rollNo: string) {
    const total = this.getTotalClasses(rollNo);
    return total ? Math.round(this.getPresentCount(rollNo) / total * 100) : 0;
  }

  // Filtered Getters
  get filteredStudents() {
    return this.studentFilter
      ? this.students.filter(s => s.rollNo === this.studentFilter)
      : this.students;
  }

  get filteredAttendance() {
    return this.attendanceList.filter(a =>
      (this.attendanceStudentFilter ? a.rollNo === this.attendanceStudentFilter : true) &&
      (this.attendanceSubjectFilter ? a.subject === this.attendanceSubjectFilter : true)
    );
  }
}
