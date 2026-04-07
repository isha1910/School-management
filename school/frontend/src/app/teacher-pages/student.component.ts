import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html'
})
export class StudentComponent {

  students: any[] = [];
  student: any = {};
  search = '';
  selectedClass = '';
  classes = [1,2,3,4,5,6,7,8,9,10];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:3000/api/student')
      .subscribe(res => this.students = res);
  }

  save() {
    if (this.student._id) {
      this.http.put('http://localhost:3000/api/student/' + this.student._id, this.student)
        .subscribe(() => {
          this.load();
          this.student = {};
        });
    } else {
      this.http.post('http://localhost:3000/api/student', this.student)
        .subscribe(() => {
          this.load();
          this.student = {};
        });
    }
  }

  edit(s: any) {
    this.student = {...s};
  }

  delete(id: string) {
    this.http.delete('http://localhost:3000/api/student/' + id)
      .subscribe(() => this.load());
  }
}