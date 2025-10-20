import { Component, OnInit } from '@angular/core';
import { CustomerOrder } from '../../../Models/customer-order.model';
import { Product } from '../../../Models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { OrdersService } from '../../../services/orders.service';
import { Customer } from '../../../Models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  showAddForm = false;
  editingCustomer: Customer | null = null;
  customerForm: Customer = {} as Customer;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(data => this.customers = data);
  }

  saveCustomer() {
    if (this.editingCustomer) {
      this.customerService.updateCustomer(this.editingCustomer.customerId!, this.customerForm).subscribe(() => {
        this.loadCustomers();
        this.editingCustomer = null;
        this.showAddForm = false;
      });
    } else {
      this.customerService.addCustomer(this.customerForm).subscribe(() => {
        this.loadCustomers();
        this.showAddForm = false;
      });
    }
  }

  editCustomer(customer: Customer) {
    this.editingCustomer = customer;
    this.customerForm = { ...customer };
    this.showAddForm = true;
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(() => this.loadCustomers());
  }

  viewOrders(customer: Customer) {
    this.router.navigate(['/orders', customer.customerId]);
  }


}
