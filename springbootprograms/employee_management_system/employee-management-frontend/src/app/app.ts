import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { clientRoutes } from './app.routes.client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>{{ title() }}</h1>
    <nav>
      <a routerLink="/employees">Employee List</a> |
      <a routerLink="/add-employee">Add Employee</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Employee Management Frontend');
}