import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../../Models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';


  constructor(private customerService: CustomerService, 
    private router: Router, private toast: ToastService) {}



  login() {
    this.customerService.login(this.email, this.password).subscribe({
      next: (customer: Customer) => {
        this.toast.success("Login successfully!");
        if (customer.admin) this.router.navigate(['/admin-dashboard']);
        else this.router.navigate(['/customer-dashboard']);
      },
      
      error: (err) => {
        this.toast.error("Invalid email or password, Login Failed.");
      }
        
    });
  }

}
