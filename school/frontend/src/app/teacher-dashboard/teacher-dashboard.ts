import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-teacher-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-dashboard.html',
  styleUrls: ['./teacher-dashboard.scss']
})
export class TeacherDashboard {

  totalStudents = 0;
  presentToday = 0;
  assignments = 0;
  classCounts: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCounts();
  }

  loadCounts() {

    // STUDENTS
    this.http.get<any[]>('http://localhost:3000/api/student')
      .subscribe(res => {
        this.totalStudents = res.length;

        this.classCounts = {};
        res.forEach(s => {
          this.classCounts[s.class] = (this.classCounts[s.class] || 0) + 1;
        });
      });

    // ASSIGNMENTS
    this.http.get<any[]>('http://localhost:3000/api/assignments')
      .subscribe(res => this.assignments = res.length);

    // ATTENDANCE
    const today = new Date().toISOString().split('T')[0];

    this.http.get<any[]>('http://localhost:3000/api/attendance')
      .subscribe(res => {
        const data = res.find(a => a.date === today);
        this.presentToday = data
          ? data.students.filter((s: any) => s.present).length
          : 0;
      });
  }
}