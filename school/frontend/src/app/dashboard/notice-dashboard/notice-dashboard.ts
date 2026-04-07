import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-notice-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard implements OnInit {

  notices: any[] = [];
  isEdit = false;

  noticeData: any = {
    _id: '',
    title: '',
    category: '',
    description: ''
  };

  constructor(private api: Api) {}

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.api.getNotices().subscribe((res: any) => {
      this.notices = res.data || [];
    });
  }

  saveNotice() {

    if (!this.noticeData.title ||
        !this.noticeData.category ||
        !this.noticeData.description) {
      alert("All fields required!");
      return;
    }

    if (this.isEdit) {

      this.api.updateNotice(this.noticeData._id, this.noticeData)
      .subscribe(() => {
        this.getNotices();
        this.resetForm();
      });

    } else {

      this.api.addNotice(this.noticeData)
      .subscribe(() => {
        this.getNotices();
        this.resetForm();
      });

    }
  }

  editNotice(n: any) {
    this.noticeData = { ...n };
    this.isEdit = true;
  }

  deleteNotice(id: any) {
    if (confirm("Delete notice?")) {
      this.api.deleteNotice(id).subscribe(() => {
        this.getNotices();
      });
    }
  }

  resetForm() {
    this.noticeData = {
      _id: '',
      title: '',
      category: '',
      description: ''
    };
    this.isEdit = false;
  }
}