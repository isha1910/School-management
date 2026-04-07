import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule,RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
 galleries: any[] = [];

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.apiService.getGallery().subscribe({
      next: (response: any) => {

        console.log(response);

        if (response && response.success === true) {
          this.galleries= response.data;
        }

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
