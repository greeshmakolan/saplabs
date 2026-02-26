import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'employee-add',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './employee-add.html',
    styleUrls: ['./employee-add.css']
})
export class EmployeeAdd {
    employeeForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: EmployeeService,
        public router: Router
    ) {
        this.employeeForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            department: [''],
            salary: ['', Validators.pattern(/^\d+$/)] // salary must be a number
        });
    }

    submit() {
        console.log('Form Value:', this.employeeForm.value);
        console.log('Form Valid:', this.employeeForm.valid);

        if (this.employeeForm.valid) {
            this.service.addEmployee(this.employeeForm.value).subscribe({
                next: () => {
                    alert('Employee added successfully!');
                    this.router.navigate(['/employees']);
                },
                error: (err) => {
                    console.error('Backend Error:', err);
                    alert('Error adding employee. Check backend.');
                }
            });
        } else {
            alert('Please fill all required fields correctly.');
        }
    }
}