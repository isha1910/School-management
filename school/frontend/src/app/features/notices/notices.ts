import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notices.html',
  styleUrls: ['./notices.scss']
})
export class Notices {

  notices: any[] = [];
  selectedNotice:any={

 title: 
 '', 
  description:
   '',
  date: 
  '', 
  category: 
  ''
  }

  constructor(private apiServices: Api) {}

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {

    this.apiServices.getNotices().subscribe({

      next: (response: any) => {

        console.log("API Response:", response);

        // direct response assign karo
        this.notices = response.data;

      },

      error: (error: any) => {
        console.error(error);
      }

    });

  }

  showNotice(notice:any){
    this.selectedNotice = notice;
  }

}