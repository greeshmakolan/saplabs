// src/app/models/employee.ts
export interface Employee {
    id: number;          // required
    name: string;
    email: string;
    phone?: string;
    department?: string;
    salary?: number;
}