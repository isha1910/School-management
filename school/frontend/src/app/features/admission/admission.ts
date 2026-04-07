import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
 templateUrl: './admission.html',
  styleUrls: ['./admission.scss']
})
export class AdmissionComponent {
  admissionForm: FormGroup;
  photoPreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.admissionForm = this.fb.group({
      // Student details
      studentName: ['', Validators.required],
      dob: ['', Validators.required],
      age: [''],
      gender: ['', Validators.required],
      bloodGroup: [''],
      religion: ['', Validators.required],
      caste: ['', Validators.required],
      nationality: ['', Validators.required],
      motherTongue: ['', Validators.required],
      aadhaar: ['', [Validators.required, Validators.minLength(6)]],

      // Admission details
      admissionClass: ['', Validators.required],
      academicYear: ['', Validators.required],
      prevSchool: [''],
      reasonLeaving: [''],

      // Parent / guardian
      fatherName: ['', Validators.required],
      fatherQualification: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      fatherOffice: [''],
      fatherContact: ['', Validators.required],
      fatherEmail: [''],
      fatherAadhaar: [''],

      motherName: ['', Validators.required],
      motherQualification: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      motherOffice: [''],
      motherContact: ['', Validators.required],
      motherEmail: [''],
      motherAadhaar: [''],

      guardianName: [''],
      guardianRelation: [''],
      guardianContact: [''],
      guardianAddress: [''],

      // Address
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],

      // Documents / photo
      studentPhoto: [null, Validators.required],

      // Declaration
      agree: [false, Validators.requiredTrue],
      declarationDate: ['', Validators.required]
    });
  }

  onPhotoUpload(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photoPreview = e.target.result;
      // store base64 in form so that pdf include works
      this.admissionForm.patchValue({ studentPhoto: this.photoPreview });
    };
    reader.readAsDataURL(file);
  }

  // copy present to permanent
  copyAddress() {
    const present = this.admissionForm.value.presentAddress || '';
    this.admissionForm.patchValue({ permanentAddress: present });
  }

  // calculate age from DOB
  calculateAge() {
    const dobVal = this.admissionForm.value.dob;
    if (!dobVal) { this.admissionForm.patchValue({ age: '' }); return; }
    const dob = new Date(dobVal);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    this.admissionForm.patchValue({ age: age });
  }

  // helper: scroll to first invalid control
  private scrollToFirstInvalid() {
    const firstInvalid = document.querySelector('.ng-invalid');
    if (firstInvalid) (firstInvalid as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async generatePDF() {
    if (this.admissionForm.invalid) {
      this.admissionForm.markAllAsTouched();
      this.scrollToFirstInvalid();
      alert('कृपया सब required fields भरें। (Please fill all required fields.)');
      return;
    }

    // get element
    const DATA: any = document.getElementById('pdfSection');
    if (!DATA) {
      alert('PDF area not found');
      return;
    }

    // better quality: increase scale
    const scale = 2;
    const canvas = await html2canvas(DATA, { scale, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // calculate image height to fit A4 width
    const imgProps = (pdf as any).getImageProperties(imgData);
    const imgWidthMM = pageWidth;
    const imgHeightMM = (imgProps.height * imgWidthMM) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMM, imgHeightMM);
    pdf.save('admission-form.pdf');
  }
}