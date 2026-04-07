import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})
export class ContactForm {

  formData:any={
    name:'',
    email:'',
    phone:'',
    subject:'',
    message:''
  }

  constructor(private apiService:Api){}

  ngOnInit(){
    window.scrollTo(0,0);
  }

  submitForm(){

    console.log("Form Data:",this.formData);

    this.apiService.sendContact(this.formData).subscribe({

      next:(response:any)=>{
        console.log("Response:",response);
        alert("Message Sent Successfully ✅");

        this.formData={
          name:'',
          email:'',
          phone:'',
          subject:'',
          message:''
        }

      },

      error:(error:any)=>{
        console.error(error);
        alert("Something went wrong ❌");
      }

    })

  }

}