import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {

  constructor(private http: HttpClient) {}

  // EVENTS
getEvents(){
return this.http.get(`${environment.apiUrl}/event`);
}

addEvent(data:any){
return this.http.post(`${environment.apiUrl}/event`,data);
}

updateEvent(id:any,data:any){
return this.http.put(`${environment.apiUrl}/event/${id}`,data);
}

deleteEvent(id:any){
return this.http.delete(`${environment.apiUrl}/event/${id}`);
}

// GALLERY
getGallery(){
return this.http.get(`${environment.apiUrl}/gallery`);
}

addGallery(data:any){
return this.http.post(`${environment.apiUrl}/gallery`,data);
}

updateGallery(id:any,data:any){
return this.http.put(`${environment.apiUrl}/gallery/${id}`,data);
}

deleteGallery(id:any){
return this.http.delete(`${environment.apiUrl}/gallery/${id}`);
}

// NOTICE
getNotices(){
return this.http.get(`${environment.apiUrl}/notice`);
}

addNotice(data:any){
return this.http.post(`${environment.apiUrl}/notice`,data);
}

updateNotice(id:any,data:any){
return this.http.put(`${environment.apiUrl}/notice/${id}`,data);
}

deleteNotice(id:any){
return this.http.delete(`${environment.apiUrl}/notice/${id}`);
}


// TEACHERS
getTeachers(){
return this.http.get(`${environment.apiUrl}/teacher`);
}

addTeacher(data:any){
return this.http.post(`${environment.apiUrl}/teacher`,data);
}

updateTeacher(id:any,data:any){
return this.http.put(`${environment.apiUrl}/teacher/${id}`,data);
}

deleteTeacher(id:any){
return this.http.delete(`${environment.apiUrl}/teacher/${id}`);
}
sendContact(data:any){
  return this.http.post(`${environment.apiUrl}/contact`,data);
}
getContacts(){
  return this.http.get(`${environment.apiUrl}/contact`);
}

deleteContact(id:any){
  return this.http.delete(`${environment.apiUrl}/contact/${id}`);
}

}