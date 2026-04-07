import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  formData = { name: '', email: '', subject: '', message: '' };
  submitted = false;

  submitForm(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;
    this.submitted = true;
    setTimeout(() => (this.submitted = false), 4000);
    this.formData = { name: '', email: '', subject: '', message: '' };
  }
}
