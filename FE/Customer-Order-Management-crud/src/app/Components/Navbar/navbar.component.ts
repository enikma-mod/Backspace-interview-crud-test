import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
// *ngIf="showNavbar" 
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    // Clear session storage / tokens if any
    localStorage.clear();
    

    this.router.navigate(['/register']);
  }

}
