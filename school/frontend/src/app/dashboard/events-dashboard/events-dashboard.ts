import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-events-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard implements OnInit {

  events:any[]=[];
  isEdit=false;
  isLoading=false;

  eventData:any={
    _id:'',
    title:'',
    date:'',
    time:'',
    location:'',
    description:''
  }

  constructor(private api:Api){}

  ngOnInit(){
    this.getEvents();
  }

  getEvents(){
    this.isLoading=true;
    this.api.getEvents().subscribe((res:any)=>{
      this.events=res.data || [];
      this.isLoading=false;
    },()=>{
      this.isLoading=false;
      alert("Error loading events");
    })
  }

  saveEvent(){

    // ✅ FIX (IMPORTANT)
    if(!this.eventData.title || !this.eventData.date){
      alert("Title and Date are required!");
      return;
    }

    this.isLoading=true;

    if(this.isEdit){
      this.api.updateEvent(this.eventData._id,this.eventData)
      .subscribe(()=>{
        this.afterSave();
      },()=> this.handleError())
    }else{
      this.api.addEvent(this.eventData)
      .subscribe(()=>{
        this.afterSave();
      },()=> this.handleError())
    }
  }

  afterSave(){
    this.getEvents();
    this.resetForm();
    this.isLoading=false;
  }

  handleError(){
    this.isLoading=false;
    alert("Something went wrong!");
  }

  editEvent(e:any){
    this.eventData={...e};
    this.isEdit=true;
  }

  deleteEvent(id:any){
    if(confirm("Delete event?")){
      this.api.deleteEvent(id).subscribe(()=>{
        this.getEvents();
      })
    }
  }

  resetForm(){
    this.eventData={
      _id:'',
      title:'',
      date:'',
      time:'',
      location:'',
      description:''
    };
    this.isEdit=false;
  }
}