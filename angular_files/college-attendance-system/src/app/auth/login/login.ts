import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  template: `
  <div class="auth-container">
    <div class="bg-image"></div>

    <div class="auth-box">
      <h2>Login</h2>

      <div *ngIf="message" class="message">{{ message }}</div>

      <form (ngSubmit)="login()">

        <!-- ROLE -->
        <label>Login As</label>
        <select [(ngModel)]="role" name="role" required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <label>Username</label>
        <input type="text" [(ngModel)]="username" name="username" required>

        <label>Password</label>
        <input type="password" [(ngModel)]="password" name="password" required>

        <!-- Roll No only for student -->
        <div *ngIf="role === 'student'">
          <label>Roll No</label>
          <input type="text" [(ngModel)]="rollNo" name="rollNo" required>
        </div>

        <label>Captcha</label>
        <div class="captcha-box">
          <span class="captcha-text">{{ generatedCaptcha }}</span>
          <button type="button" (click)="generateCaptcha()">⟳</button>
        </div>

        <input
          type="text"
          [(ngModel)]="captchaInput"
          name="captchaInput"
          placeholder="Enter Captcha"
          required>

        <button type="submit">Login</button>
      </form>

      <p class="redirect">
        Don't have an account?
        <a routerLink="/register">Register here</a>
      </p>
    </div>
  </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', sans-serif;
    }
    .bg-image {
      position: absolute;
      inset: 0;
      background: url('https://c8.alamy.com/comp/2JG544P/visit-report-text-on-notebook-wooden-doll-on-blue-background-2JG544P.jpg')
      no-repeat center/cover;
      filter: blur(8px);
    }
    .auth-box {
      background: rgba(255,255,255,0.9);
      padding: 40px;
      border-radius: 15px;
      width: 360px;
      z-index: 1;
    }
    label {
      font-weight: bold;
      margin-top: 10px;
      display: block;
    }
    input, select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
    .captcha-box {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }
    button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background: #28a745;
      color: white;
      border-radius: 8px;
      border: none;
      font-weight: bold;
    }
    .message {
      background: #f8d7da;
      padding: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class Login {

  username = '';
  password = '';
  rollNo = '';
  role = '';
  captchaInput = '';
  generatedCaptcha = '';
  message = '';

  constructor(private router: Router) {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    this.generatedCaptcha = '';
    for (let i = 0; i < 5; i++) {
      this.generatedCaptcha += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  login() {
    // 🔴 Required field check
    if (!this.username || !this.password || !this.role || !this.captchaInput) {
      this.message = 'Please fill all fields';
      return;
    }

    // 🔴 Captcha check
    if (this.captchaInput !== this.generatedCaptcha) {
      this.message = 'Invalid captcha';
      this.captchaInput = '';
      this.generateCaptcha();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 🔍 Find user
    const user = users.find((u: any) =>
      u.username === this.username &&
      u.password === this.password &&
      u.role === this.role
    );

    if (!user) {
      this.message = 'Invalid username or password';
      return;
    }

    // 🎓 Student roll no validation
    if (this.role === 'student') {
      if (!this.rollNo) {
        this.message = 'Please enter Roll No';
        return;
      }
      if (user.rollNo !== this.rollNo) {
        this.message = 'Invalid Roll No';
        return;
      }
    }

    // ✅ Save login session
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    // 🚀 Redirect
    this.router.navigate([
      user.role === 'faculty'
        ? '/faculty-dashboard'
        : '/student-dashboard'
    ]);
  }
}
