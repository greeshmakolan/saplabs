import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Counter
  number = 0;
  incrementNum() { this.number += 1; }
  decrementNum() { this.number -= 1; }
  resetNum() { this.number = 0; }

  // Login
  username = '';
  password = '';
  message = '';

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      this.message = 'Login Successful 🎉';
    } else {
      this.message = 'Invalid Username or Password ❌';
    }
  }
}

// bootstrap the app
bootstrapApplication(App)
  .catch(err => console.error(err));
