import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../../../Models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
    customer: Customer = {
    customerName: '',
    customerSurname: '',
    customerEmail: '',
    customerPhoneNumber: '',
    customerPassword: '',
    isAdmin: false
  };
  message = '';
  errorMessage = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  register(): void {
    this.customerService.addCustomer(this.customer).subscribe({
      next: () => {
        this.message = 'Registration successful!';
        setTimeout(() => this.router.navigate(['customer-dashboard']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to register. Please try again.';
      },
    });
  }

}
