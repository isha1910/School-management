import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { TeachersDashboard } from './teachers-dashboard/teachers-dashboard';
import { NoticeDashboard } from './notice-dashboard/notice-dashboard';
import { GalleryDashboard } from './gallery-dashboard/gallery-dashboard';
import { EventsDashboard } from './events-dashboard/events-dashboard';
import { ContactDashboard } from './contact-dashboard/contact-dashboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TeachersDashboard,
    NoticeDashboard,
    GalleryDashboard,
    EventsDashboard,
    ContactDashboard,CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})

export class Dashboard implements OnInit{

selectedMenu:string='contact'

totalTeachers=0
totalNotices=0
totalGallery=0
totalContacts=0

// ⭐ NEW
showProfile=false

constructor(private api:Api){}

ngOnInit(){

this.getTeachers()
this.getNotices()
this.getGallery()
this.getContacts()

}

toggleProfile(){
this.showProfile=!this.showProfile
}

logout(){
localStorage.removeItem('token')
location.href='/login'
}

getTeachers(){
this.api.getTeachers().subscribe((res:any)=>{
this.totalTeachers=res.data.length
})
}

getNotices(){
this.api.getNotices().subscribe((res:any)=>{
this.totalNotices=res.data.length
})
}

getGallery(){
this.api.getGallery().subscribe((res:any)=>{
this.totalGallery=res.data.length
})
}

getContacts(){
this.api.getContacts().subscribe((res:any)=>{
this.totalContacts=res.data.length
})
}

}