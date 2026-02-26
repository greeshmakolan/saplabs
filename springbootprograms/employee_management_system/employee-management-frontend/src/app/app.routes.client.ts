import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeAdd } from './components/employee-add/employee-add';
import { EmployeeUpdate } from './components/employee-update/employee-update';

export const clientRoutes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeeList },
    { path: 'add-employee', component: EmployeeAdd },
    { path: 'update-employee/:id', component: EmployeeUpdate }
];