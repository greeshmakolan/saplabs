import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { StudentDashboard } from './student-dashboard/student-dashboard';
import { FacultyDashboard } from './faculty-dashboard/faculty-dashboard';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'student-dashboard', component: StudentDashboard },
    { path: 'faculty-dashboard', component: FacultyDashboard },
    { path: '**', redirectTo: 'login' }
];
