import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  template: `
  <div class="auth-container">
    <div class="bg-image"></div>

    <div class="auth-box">
      <h2>Register</h2>

      <div *ngIf="message" class="message">{{ message }}</div>

      <form (ngSubmit)="register()">

        <label>Username</label>
        <input type="text" [(ngModel)]="username" name="username" required>

        <label>Email</label>
        <input type="email" [(ngModel)]="email" name="email" required>

        <label>Password</label>
        <input type="password" [(ngModel)]="password" name="password" required>

        <label>Confirm Password</label>
        <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required>

        <label>Role</label>
        <select [(ngModel)]="role" name="role" required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <!-- Roll No only for student -->
        <div *ngIf="role === 'student'">
          <label>Roll No</label>
          <input type="text" [(ngModel)]="rollNo" name="rollNo" required>
        </div>

        <!-- CAPTCHA -->
        <label>Captcha</label>
        <div class="captcha-box">
          <span class="captcha-text">{{ generatedCaptcha }}</span>
          <button type="button" class="refresh-btn" (click)="generateCaptcha()">⟳</button>
        </div>
        <input
          type="text"
          [(ngModel)]="captchaInput"
          name="captchaInput"
          placeholder="Enter Captcha"
          required
        >

        <button type="submit">Register</button>
      </form>

      <p class="redirect">
        Already have an account?
        <a routerLink="/login">Login here</a>
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
      position: relative;
    }

    .bg-image {
      position: absolute;
      inset: 0;
      background: url('https://c8.alamy.com/comp/2JG544P/visit-report-text-on-notebook-wooden-doll-on-blue-background-2JG544P.jpg') no-repeat center/cover;
      filter: blur(8px);
      z-index: -1;
    }

    .auth-box {
      background: rgba(255,255,255,0.95);
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
      box-sizing: border-box;
    }

    .message {
      background: #d1ecf1;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
      font-weight: bold;
    }

    /* CAPTCHA */
    .captcha-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      margin: 10px 0;
      border-radius: 10px;
      border: 2px dashed #888;
      background: linear-gradient(135deg, #f4f4f4, #dedede);
      position: relative;
      overflow: hidden;
    }

    .captcha-text {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 4px;
      color: #111;
      filter: blur(0.6px);
      text-shadow: 1px 1px 0 #999;
      flex-grow: 1;
      user-select: none;
    }

    .captcha-box::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(25deg, transparent 40%, rgba(0,0,0,0.3) 50%, transparent 60%),
        linear-gradient(-20deg, transparent 35%, rgba(0,0,0,0.25) 50%, transparent 65%);
      opacity: 0.6;
      pointer-events: none;
    }

    .refresh-btn {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #111;
      color: #fff;
      font-size: 20px;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease, background 0.3s ease;
    }

    .refresh-btn:hover {
      background: #1976d2;
      transform: rotate(180deg);
    }

    button[type="submit"] {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background: #007bff;
      color: white;
      border-radius: 8px;
      border: none;
      font-weight: bold;
      cursor: pointer;
    }

    .redirect {
      text-align: center;
      margin-top: 15px;
    }
  `]
})
export class Register {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  role = '';
  rollNo = '';
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

  register() {
    if (!this.username || !this.email || !this.password ||
      !this.confirmPassword || !this.role || !this.captchaInput ||
      (this.role === 'student' && !this.rollNo)) {
      this.message = 'Please fill all fields!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    if (this.captchaInput.toUpperCase() !== this.generatedCaptcha) {
      this.message = 'Captcha is incorrect!';
      this.captchaInput = '';
      this.generateCaptcha();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some((u: any) => u.username === this.username || u.email === this.email);
    if (exists) {
      this.message = 'Username or email already exists!';
      return;
    }

    users.push({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      rollNo: this.role === 'student' ? this.rollNo : null
    });

    localStorage.setItem('users', JSON.stringify(users));
    this.message = 'Registration successful! Redirecting to login...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }
}
