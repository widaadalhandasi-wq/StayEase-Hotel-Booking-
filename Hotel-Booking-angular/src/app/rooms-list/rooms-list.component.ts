import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { Room } from '../room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html'
})
export class RoomsListComponent implements OnInit {
  rooms: Room[] = [];
  onlyAvailable: boolean = false;

  constructor(private roomsService: RoomsService, private router: Router) {}

  ngOnInit(): void { this.loadRooms(); }

  loadRooms() {
    this.rooms = this.onlyAvailable ? this.roomsService.getAvailableRooms() : this.roomsService.getRooms();
  }

  handleSelection(room: Room) {
    alert(`Room "${room.name}" selected! Redirecting...`);
    this.router.navigate(['/booking'], { queryParams: { roomId: room.id } });
  }
}