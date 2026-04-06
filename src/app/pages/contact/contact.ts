import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact = {
    name: '',
    email: '',
    message: '',
  };

  submitted = false;

  submitForm() {
    console.log('Form Data:', this.contact);
    this.submitted = true;

    // Reset form after submission
    this.contact = { name: '', email: '', message: '' };
  }
}
