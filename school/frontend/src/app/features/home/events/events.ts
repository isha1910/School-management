import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class Events {

  events: any[] = [];

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.apiService.getEvents().subscribe({
      next: (response: any) => {

        console.log(response);

        if (response && response.success === true) {
          this.events = response.data;
        }

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}