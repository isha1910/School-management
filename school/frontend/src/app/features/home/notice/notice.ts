import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../../../services/api';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notice.html',
  styleUrls: ['./notice.scss']
})
export class Notice {

  notices: string = '';

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.apiService.getNotices().subscribe({
      next: (response: any) => {

        console.log(response);   // 👈 check console

        if (response && response.success === true) {

          let noticeArray: string[] = [];

          response.data.forEach((obj: any) => {
            noticeArray.push(obj.title);
          });

          this.notices = noticeArray.join(' | ');
        }

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}