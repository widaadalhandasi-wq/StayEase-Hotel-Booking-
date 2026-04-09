import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../room'; 

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html'
})
export class RoomCardComponent {
  @Input() roomData!: Room; 
  
  @Output() select = new EventEmitter<Room>();

  onBookNow() {
    this.select.emit(this.roomData);
  }
}