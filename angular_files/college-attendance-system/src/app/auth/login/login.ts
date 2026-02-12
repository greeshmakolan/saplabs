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
      background: #f8d7da;
      padding: 10px;
      margin-bottom: 10px;
    }

    /* CAPTCHA */
    .captcha-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      margin-top: 6px;
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

    /* noise overlay */
    .captcha-box::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(25deg, transparent 40%, rgba(0, 0, 0, 0.3) 50%, transparent 60%),
        linear-gradient(-20deg, transparent 35%, rgba(0, 0, 0, 0.25) 50%, transparent 65%);
      opacity: 0.6;
      pointer-events: none;
    }

    .refresh-btn {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background:#007bff ;
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
      background:#007bff;
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
      margin-top: 12px;
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
    if (!this.username || !this.password || !this.role || !this.captchaInput) {
      this.message = 'Please fill all fields';
      return;
    }

    if (this.captchaInput.toUpperCase() !== this.generatedCaptcha) {
      this.message = 'Invalid captcha';
      this.captchaInput = '';
      this.generateCaptcha();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) =>
      u.username === this.username &&
      u.password === this.password &&
      u.role === this.role
    );

    if (!user) {
      this.message = 'Invalid username or password';
      return;
    }

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

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate([
      user.role === 'faculty' ? '/faculty-dashboard' : '/student-dashboard'
    ]);
  }
}
