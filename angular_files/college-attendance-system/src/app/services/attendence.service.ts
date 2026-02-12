import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AttendanceService {

    private key = 'attendance';

    getAttendance() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }

    addAttendance(record: any) {
        const data = this.getAttendance();
        record.id = Date.now();
        data.push(record);
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    deleteAttendanceByStudent(studentId: number) {
        const data = this.getAttendance().filter(
            (a: any) => a.studentId !== studentId
        );
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}
