import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.scss']
})
export class Teachers {

  teachers: any[] = [];

  constructor(private apiService: Api) {}

  ngOnInit() {
    window.scrollTo(0,0);
    this.getTeachers();
  }

  getTeachers(){

    this.apiService.getTeachers().subscribe({

      next:(response:any)=>{

        console.log("Teachers Response:",response);

        if(response){
          this.teachers = response.data || response;
        }

      },

      error:(error:any)=>{
        console.error(error);
      }

    });

  }

}