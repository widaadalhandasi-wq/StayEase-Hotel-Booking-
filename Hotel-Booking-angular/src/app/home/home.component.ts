import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', // Fixed path
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  heroImage = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070';
}