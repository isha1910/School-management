import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
selector:'app-teachers-dashboard',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./teachers-dashboard.html',
styleUrl:'./teachers-dashboard.scss'
})
export class TeachersDashboard implements OnInit{

teachers:any[]=[];
isEdit=false;

teacherData:any={
_id:'',
name:'',
subject:'',
designation:'',
profilePicture:'',
bio:''
}

constructor(private api:Api){}

ngOnInit(){
this.getTeachers();
}

getTeachers(){
this.api.getTeachers().subscribe((res:any)=>{
this.teachers=res.data;
})
}

saveTeacher(){

if(this.isEdit){

this.api.updateTeacher(this.teacherData._id,this.teacherData).subscribe(()=>{
this.getTeachers();
})

}else{

this.api.addTeacher(this.teacherData).subscribe(()=>{
this.getTeachers();
})

}

}

editTeacher(t:any){
this.teacherData={...t}
this.isEdit=true
}

deleteTeacher(id:any){
this.api.deleteTeacher(id).subscribe(()=>{
this.getTeachers();
})
}

}