import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module'; // 1. أضف هذا السطر

import { AppComponent } from './app.component';
import { RoomCardComponent } from './room-card/room-card.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomCardComponent,
    RoomsListComponent,
    BookingFormComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule //
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }