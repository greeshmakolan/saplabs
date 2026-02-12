import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {

    private key = 'students';

    getStudents() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }

    addStudent(student: any) {
        const students = this.getStudents();
        student.id = Date.now();
        students.push(student);
        localStorage.setItem(this.key, JSON.stringify(students));
    }

    deleteStudent(id: number) {
        const students = this.getStudents().filter((s: any) => s.id !== id);
        localStorage.setItem(this.key, JSON.stringify(students));
    }
}
