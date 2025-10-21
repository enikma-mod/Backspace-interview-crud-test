import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../../../Models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    admin: false
  };
  message = '';
  errorMessage = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  register(): void {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (customer: Customer) => {
        this.message = 'Registration successful!';
        console.log("is admin:", customer?.admin);

        if (customer?.admin) {
          console.log("is it here 1")
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.log("is it here 2")
          this.router.navigate(['/customer-dashboard']);
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to register. Please try again.';
      },
    });
  }


}


