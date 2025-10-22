import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../Models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})

export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer = {
    customerName: '',
    customerSurname: '',
    customerPhoneNumber: '',
    customerEmail: '',
    orders: [],
    admin: true
  };

  displayForm = false;
  displayOrders = false;
  toastMessage: string = '';

  constructor(private customerService: CustomerService){}
  
  ngOnInit(): void {
    this.loadCustomers();
  }

  openForm() {
    this.selectedCustomer = { customerName: '', customerSurname: '', customerPhoneNumber: '', customerEmail: '', admin: false };
    this.displayForm = true;
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(data => this.customers = data);
  }

  saveCustomer(customer: Customer) {
    if (customer.customerId) {
      this.customerService.updateCustomer(customer.customerId, customer).subscribe(() => {
        this.toastMessage = 'Customer updated successfully!';
        this.displayForm = false;
        this.loadCustomers();
        setTimeout(() => this.toastMessage = '', 3000);
      });
    } else {
      this.customerService.addCustomer(customer).subscribe(() => {
        this.toastMessage = 'Customer added successfully!';
        this.displayForm = false;
        this.loadCustomers();
        setTimeout(() => this.toastMessage = '', 3000);
      });
    }
  }

}
