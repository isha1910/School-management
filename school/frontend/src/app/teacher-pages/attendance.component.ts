import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-attendance',
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent {

  students: any[] = [];
  date = new Date().toISOString().split('T')[0];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/student')
      .subscribe(res => this.students = res);
  }

  save() {
    this.http.post('http://localhost:3000/api/attendance', {
      date: this.date,
      students: this.students
    }).subscribe(() => alert("Saved"));
  }
}