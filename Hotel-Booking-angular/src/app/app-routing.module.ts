import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },       
  { path: 'home', component: HomeComponent },      
  { path: 'rooms', component: RoomsListComponent },
  { path: 'booking', component: BookingFormComponent },
  { path: '**', redirectTo: '' }           
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }