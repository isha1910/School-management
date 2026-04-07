import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Teacher } from '../../services/api.service';

@Component({
  selector: 'app-public-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-teachers.component.html',
  styleUrls: ['./public-teachers.component.scss'],
})
export class PublicTeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = true;
  searchTerm = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get filteredTeachers(): Teacher[] {
    if (!this.searchTerm) return this.teachers;
    const term = this.searchTerm.toLowerCase();
    return this.teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.subject.toLowerCase().includes(term)
    );
  }
}
