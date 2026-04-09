import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  guestName: string = '';

  confirmBooking() {
    console.log("Button Clicked!");
    if (this.guestName) {
      alert(`Booking confirmed for: ${this.guestName}`);
    }
  }
}