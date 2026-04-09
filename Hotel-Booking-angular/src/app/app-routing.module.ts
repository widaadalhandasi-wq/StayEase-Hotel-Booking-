import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

const routes: Routes = [
  { path: 'rooms', component: RoomsListComponent },
  { path: 'booking', component: BookingFormComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
