import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrls: ['./contact-dashboard.scss']
})
export class ContactDashboard {

  contacts: any[] = [];
  selectedContact: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getContacts();
  }

  // ✅ GET CONTACTS
  getContacts() {
    this.http.get<any>('http://localhost:3000/api/contact').subscribe({
      next: (res) => {
        this.contacts = res.data;
      },
      error: (err) => {
        console.log("API ERROR:", err);
      }
    });
  }

  // ✅ VIEW CONTACT
  viewContact(contact: any) {
    this.selectedContact = contact;
  }

  // ✅ DELETE CONTACT (🔥 FIX)
  deleteContact(id: string) {

    if (!confirm("Are you sure you want to delete?")) return;

    this.http.delete(`http://localhost:3000/api/contact/${id}`).subscribe({
      next: () => {
        alert("Deleted Successfully");

        // 🔄 refresh list
        this.getContacts();
      },
      error: (err) => {
        console.log("DELETE ERROR:", err);
      }
    });
  }
}