import { Component } from '@angular/core';

// If using Angular 17+ Standalone, ensure CommonModule and FormsModule are imported
@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {

  // 1. Define the data object to sync with the HTML inputs
  bookingData = {
    guestName: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: 'single', // Default value
    guestsCount: 1     // Default value
  };

  constructor() {}

  // 2. Logic for the 'Confirm Reservation' button
  confirmBooking() {
    // Basic validation check
    if (this.isValid()) {
      console.log('Booking submitted successfully:', this.bookingData);
      
      // Example: Show a success message
      alert(`Reservation confirmed for ${this.bookingData.guestName}!`);
      
      // Optional: Reset the form after submission
      // this.resetForm();
    } else {
      alert('Please fill in the required fields.');
    }
  }

  // Helper method to check if mandatory fields are filled
  private isValid(): boolean {
    return this.bookingData.guestName.trim() !== '' && 
           this.bookingData.phone.trim() !== '';
  }

  // Optional: Reset form logic
  resetForm() {
    this.bookingData = {
      guestName: '',
      phone: '',
      email: '',
      checkIn: '',
      checkOut: '',
      roomType: 'single',
      guestsCount: 1
    };
  }
}