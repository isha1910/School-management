import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class Events {

  events: any[] = [];
  selectedEvent:any;

  constructor(private apiService: Api) {}

  ngOnInit(){
    window.scrollTo(0,0);
    this.getEvents();
  }

  getEvents() {

    this.apiService.getEvents().subscribe({

      next: (response: any) => {

        console.log("Events Response:",response);

        // agar API direct array bhej rahi ho
        if(response){
          this.events = response.data || response;
        }

      },

      error: (error: any) => {
        console.error(error);
      }

    });

  }

  showEvent(event:any){
    this.selectedEvent = event;
  }

}