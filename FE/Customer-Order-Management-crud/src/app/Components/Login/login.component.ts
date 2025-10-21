import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../Models/customer.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    email = '';
  password = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  login() {
    this.customerService.login(this.email, this.password).subscribe({
      next: (customer: Customer) => {
        if (customer.isAdmin) this.router.navigate(['/admin']);
        else this.router.navigate(['/customer-dashboard']);
      },
      error: err => alert('Login failed: ' + err.message)
    });
  }

}
