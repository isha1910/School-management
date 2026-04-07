import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard implements OnInit {

  teachers: any[] = [];
  isEdit = false;

  teacherData: any = {
    _id: '',
    name: '',
    subject: '',
    designation: '',
    image: '',
    bio: ''
  };

  constructor(private api: Api) {}

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers() {
    this.api.getTeachers().subscribe((res: any) => {
      this.teachers = res.data || [];
    });
  }

  saveTeacher() {

    if (!this.teacherData.name ||
        !this.teacherData.subject ||
        !this.teacherData.designation ||
        !this.teacherData.image ||
        !this.teacherData.bio) {
      alert("All fields required!");
      return;
    }

    if (this.isEdit) {
      this.api.updateTeacher(this.teacherData._id, this.teacherData)
      .subscribe(() => {
        this.getTeachers();
        this.resetForm();
      });
    } else {
      this.api.addTeacher(this.teacherData)
      .subscribe(() => {
        this.getTeachers();
        this.resetForm();
      });
    }
  }

  editTeacher(t: any) {
    this.teacherData = { ...t };
    this.isEdit = true;
  }

  deleteTeacher(id: any) {
    if (confirm("Delete teacher?")) {
      this.api.deleteTeacher(id).subscribe(() => {
        this.getTeachers();
      });
    }
  }

  resetForm() {
    this.teacherData = {
      _id: '',
      name: '',
      subject: '',
      designation: '',
      image: '',
      bio: ''
    };
    this.isEdit = false;
  }
}