import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  mode: 'register' | 'login' = 'register';

  // Registration
  regUsername = '';
  regEmail = '';
  regPassword = '';
  regConfirmPassword = '';
  regCaptcha = '';
  regUserCaptcha = '';
  regMessage = '';
  regSuccess = false;

  // Login
  loginUsername = '';
  loginEmail = '';
  loginPassword = '';
  loginCaptcha = '';
  loginUserCaptcha = '';
  loginMessage = '';
  loginSuccess = false;

  constructor() {
    this.generateRegCaptcha();
    this.generateLoginCaptcha();
  }

  generateCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    for (let i = 0; i < 5; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }
    return text;
  }

  generateRegCaptcha() {
    this.regCaptcha = this.generateCaptcha();
  }

  generateLoginCaptcha() {
    this.loginCaptcha = this.generateCaptcha();
  }

  register() {
    if (!this.regUsername || !this.regEmail || !this.regPassword || !this.regConfirmPassword || !this.regUserCaptcha) {
      this.regMessage = 'All fields are required';
      this.regSuccess = false;
      return;
    }

    if (this.regPassword !== this.regConfirmPassword) {
      this.regMessage = 'Passwords do not match';
      this.regSuccess = false;
      return;
    }

    if (this.regUserCaptcha !== this.regCaptcha) {
      this.regMessage = 'Captcha incorrect';
      this.regSuccess = false;
      this.generateRegCaptcha();
      this.regUserCaptcha = '';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
      username: this.regUsername,
      email: this.regEmail,
      password: this.regPassword
    });
    localStorage.setItem('users', JSON.stringify(users));

    this.regMessage = 'Registration successful 🎉';
    this.regSuccess = true;

    setTimeout(() => this.mode = 'login', 1200);
  }

  login() {
    if (!this.loginUsername || !this.loginEmail || !this.loginPassword || !this.loginUserCaptcha) {
      this.loginMessage = 'All fields are required';
      this.loginSuccess = false;
      return;
    }

    if (this.loginUserCaptcha !== this.loginCaptcha) {
      this.loginMessage = 'Captcha incorrect';
      this.loginSuccess = false;
      this.generateLoginCaptcha();
      this.loginUserCaptcha = '';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) =>
      u.username === this.loginUsername &&
      u.email === this.loginEmail &&
      u.password === this.loginPassword
    );

    if (found) {
      this.loginMessage = 'Login successful 🎉';
      this.loginSuccess = true;
    } else {
      this.loginMessage = 'Invalid credentials';
      this.loginSuccess = false;
    }
  }

  switchMode(mode: 'register' | 'login') {
    this.mode = mode;
  }
}
