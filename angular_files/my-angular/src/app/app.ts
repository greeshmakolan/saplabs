import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular');
  number = 0
  incrementNum() {
    this.number += 1
  }

  decrementNum() {
    this.number -= 1
  }

  resetNum() {
    this.number = 0
  }
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

