import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Customer } from '../../Models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer?: Customer;
  loading: boolean = true;

  constructor(private customerService: CustomerService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadCustomers();

      this.customerService.getAllCustomers().subscribe({
        next: (data) => {
          console.log('Received data:', data); 
          this.customers = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading customers:', err);
          this.loading = false;
      }
    })

    
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error loading customers', err),
    });
  }

  proceed() {
    if (!this.selectedCustomer) return;

    // Navigate based on backend isAdmin field
    if (this.selectedCustomer.admin) {
      this.router.navigate(['/admin'], { state: { user: this.selectedCustomer } });
    } else {
      this.router.navigate(['/customer', this.selectedCustomer.customerId], { state: { user: this.selectedCustomer } });
    }
  }

  createUserAccount() {
    console.log('clicked btn');
    this.router.navigate(['/register']);
  }

}
