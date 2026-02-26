import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
    selector: 'employee-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './employee-list.html',
    styleUrls: ['./employee-list.css']
})
export class EmployeeList implements OnInit {
    employees = signal<Employee[]>([]);

    constructor(private service: EmployeeService, public router: Router) { } // router is now public

    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees() {
        this.service.getEmployees().subscribe({
            next: (data) => this.employees.set(data),
            error: (err) => console.error(err)
        });
    }

    deleteEmployee(id: number) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.service.deleteEmployee(id).subscribe({
                next: () => this.loadEmployees(),
                error: (err) => console.error(err)
            });
        }
    }
}