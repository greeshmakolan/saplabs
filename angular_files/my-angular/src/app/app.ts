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
  username = '';
  password = '';
  message = '';

  captcha = '';
  userCaptcha = '';

  constructor() {
    this.generateCaptcha();
  }

  // Generate 5-character alphanumeric captcha
  generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captcha = result;
  }

  login() {
    if (!this.username || !this.password || !this.userCaptcha) {
      this.message = 'Please fill all fields ❌';
      return;
    }

    if (this.userCaptcha !== this.captcha) {
      this.message = 'Captcha incorrect ❌';
      this.userCaptcha = '';
      this.generateCaptcha();
      return;
    }

    if (this.username === 'admin' && this.password === '1234') {
      this.message = 'Login Successful 🎉';
    } else {
      this.message = 'Invalid Username or Password ❌';
    }
  }
}
