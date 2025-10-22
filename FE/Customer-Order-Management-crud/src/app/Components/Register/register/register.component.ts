import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../../../Models/customer.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../../services/toast.service';

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

  constructor(
    private customerService: CustomerService, 
    private router: Router,
    private toast: ToastService
  ) {}


  register(): void {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (customer: Customer) => {
        this.message = 'Registration successful!';
        this.toast.success(this.message);
        if (customer?.admin) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/customer-dashboard']);
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to register, Please try again")
        this.errorMessage = 'Failed to register. Please try again.';
      },
    });
  }


}


