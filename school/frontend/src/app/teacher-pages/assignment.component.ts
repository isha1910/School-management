import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-assignment',
  imports: [CommonModule],
  templateUrl: './assignment.component.html'
})
export class AssignmentComponent {

  files: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:3000/api/assignments')
      .subscribe(res => this.files = res);
  }

  upload(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    this.http.post('http://localhost:3000/api/assignments/upload', formData)
      .subscribe(() => this.load());
  }
}