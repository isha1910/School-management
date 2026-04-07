import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
selector:'app-notice-dashboard',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./notice-dashboard.html',
styleUrl:'./notice-dashboard.scss'
})
export class NoticeDashboard implements OnInit{

notices:any[]=[];
isEdit=false;

noticeData:any={
_id:'',
title:'',
category:'',
description:''
}

constructor(private api:Api){}

ngOnInit(){
this.getNotices();
}

getNotices(){
this.api.getNotices().subscribe((res:any)=>{
this.notices=res.data;
})
}

saveNotice(){

if(this.isEdit){

this.api.updateNotice(this.noticeData._id,this.noticeData).subscribe(()=>{
this.getNotices();
})

}else{

this.api.addNotice(this.noticeData).subscribe(()=>{
this.getNotices();
})

}

}

editNotice(n:any){
this.noticeData={...n}
this.isEdit=true
}

deleteNotice(id:any){
this.api.deleteNotice(id).subscribe(()=>{
this.getNotices();
})
}

}