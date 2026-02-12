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

        <!-- ✅ Roll No only for Student -->
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
      position: relative;
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
      position: relative;
      background: rgba(255,255,255,0.9);
      padding: 40px;
      border-radius: 15px;
      width: 360px;
      z-index: 1;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
    .auth-box label {
      font-weight: bold;
      display: block;
      margin-top: 10px;
    }
    .auth-box input,
    .auth-box select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
    .captcha-box {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 10px 0;
    }
    .captcha-text {
      font-weight: bold;
      padding: 8px 20px;
      background: #eee;
      border-radius: 6px;
    }
    button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
    }
    .message {
      background: #d1ecf1;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      font-weight: bold;
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
  rollNo = '';          // ✅ NEW
  captchaInput = '';
  generatedCaptcha = '';
  message = '';

  constructor(private router: Router) {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.generatedCaptcha = '';
    for (let i = 0; i < 5; i++) {
      this.generatedCaptcha += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
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

    if (this.captchaInput !== this.generatedCaptcha) {
      this.message = 'Captcha is incorrect!';
      this.captchaInput = '';
      this.generateCaptcha();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.some(
      (u: any) => u.username === this.username || u.email === this.email
    );

    if (exists) {
      this.message = 'Username or email already exists!';
      return;
    }

    // ✅ STORE ROLL NO ONLY FOR STUDENT
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
