import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private baseUrl = 'http://localhost:8084/api/employees';

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseUrl);
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseUrl}/${id}`);
    }

    addEmployee(emp: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.baseUrl, emp);
    }

    updateEmployee(id: number, emp: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.baseUrl}/${id}`, emp);
    }

    deleteEmployee(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}