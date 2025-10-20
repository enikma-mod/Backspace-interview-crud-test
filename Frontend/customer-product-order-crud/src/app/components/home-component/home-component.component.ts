import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
// import { DropdownModule } from 'primeng/dropdown';
import { Customer } from '../../models/customer.model';


@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponentComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer?: Customer;

  constructor(private customerService: CustomerService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error loading customers', err),
    });
  }

  proceed() {
    if (!this.selectedCustomer) return;

    if (this.selectedCustomer.isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/customer']);
    }
  }

}
