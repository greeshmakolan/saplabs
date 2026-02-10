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

  regUsername = '';
  regPassword = '';
  regConfirmPassword = '';
  regCaptcha = '';
  regUserCaptcha = '';
  regMessage = '';
  regSuccess = false;

  loginUsername = '';
  loginPassword = '';
  loginCaptcha = '';
  loginUserCaptcha = '';
  loginMessage = '';
  loginSuccess = false;

  constructor() {
    this.generateRegCaptcha();
    this.generateLoginCaptcha();
  }

  randomCaptcha(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let cap = '';
    for (let i = 0; i < 5; i++) {
      cap += chars[Math.floor(Math.random() * chars.length)];
    }
    return cap;
  }

  generateRegCaptcha() {
    this.regCaptcha = this.randomCaptcha();
  }

  generateLoginCaptcha() {
    this.loginCaptcha = this.randomCaptcha();
  }

  register() {
    if (!this.regUsername || !this.regPassword || !this.regConfirmPassword || !this.regUserCaptcha) {
      this.regMessage = 'All fields required';
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

    localStorage.setItem(this.regUsername, this.regPassword);
    this.regMessage = 'Registration successful';
    this.regSuccess = true;

    setTimeout(() => this.mode = 'login', 1500);
  }

  login() {
    const storedPass = localStorage.getItem(this.loginUsername);

    if (!this.loginUsername || !this.loginPassword || !this.loginUserCaptcha) {
      this.loginMessage = 'All fields required';
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

    if (storedPass === this.loginPassword) {
      this.loginMessage = 'Login successful';
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
