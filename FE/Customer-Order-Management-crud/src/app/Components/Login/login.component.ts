import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../../Models/customer.model';
import { ToastComponent } from '../utils/toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';


  toast = {
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info' | 'warning',
    duration: 3000
  };

  constructor(private customerService: CustomerService, private router: Router) {}

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toast = { visible: true, message, type, duration: 3000 };
    setTimeout(() => (this.toast.visible = false), 3000);
  }


  login() {
    this.customerService.login(this.email, this.password).subscribe({
      next: (customer: Customer) => {
        this.showToast('Login successful! Redirecting...', 'success');
        if (customer.admin) this.router.navigate(['/admin-dashboard']);
        else this.router.navigate(['/customer-dashboard']);
      },
      
      error: (err) => {
        this.showToast('Invalid email or password.', 'error');
      }
        
    });
  }

}
