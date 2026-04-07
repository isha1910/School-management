import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class Gallery {

  galleries: any[] = [];

  constructor(private apiService: Api) {}

  ngOnInit(){
    window.scrollTo(0,0);
    this.getGallery();
  }

  getGallery(){

    this.apiService.getGallery().subscribe({

      next:(response:any)=>{

        console.log("Gallery Response:",response);

        if(response){
          this.galleries = response.data || response;
        }

      },

      error:(error:any)=>{
        console.error(error);
      }

    });

  }

}