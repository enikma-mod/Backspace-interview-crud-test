import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../../../Models/customer.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from '../../utils/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastComponent],
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

  toast = {
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info' | 'warning',
    duration: 3000
  };

  constructor(private customerService: CustomerService, private router: Router,
    private toastr: ToastrService
  ) {}

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toast = { visible: true, message, type, duration: 3000 };
    setTimeout(() => (this.toast.visible = false), 3000);
  }

  register(): void {
    this.customerService.addCustomer(this.customer).subscribe({
      next: (customer: Customer) => {
        this.message = 'Registration successful!';
        this.showToast('Registration successful!', 'success');
        if (customer?.admin) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/customer-dashboard']);
        }
      },
      error: (err) => {
        console.error(err);
        this.showToast('Failed to register. Please try again.', 'error');
        this.errorMessage = 'Failed to register. Please try again.';
      },
    });
  }


}


