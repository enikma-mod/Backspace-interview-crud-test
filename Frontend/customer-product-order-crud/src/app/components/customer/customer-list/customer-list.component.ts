import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; 
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    FormsModule,
    DialogModule,
    ToastModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  providers: [ConfirmationService, MessageService]
})

export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  // selectedCustomer?: Customer;
  selectedCustomer: Customer = {
    customerName: '',
    customerSurname: '',
    customerPhoneNumber: '',
    customerEmail: '',
    orders: []
};
  displayForm = false;
  displayOrders = false;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}
  
  ngOnInit(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Customer Added',
      detail: 'Record added successfully!',
      

    });

    setTimeout(() => {
      this.displayForm = true; 
    }, 1000);

    this.loadCustomers();

      this.customerService.getAllCustomers().subscribe({
        next: (data) => {
          console.log('Received data:', data); 
          this.customers = data;
        },
        error: (err) => {
          console.error('Error loading customers:', err);
      }
    })
  }


  show() {
    console.log('HSHSHSHSHSHSH');
  }
  

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(data => this.customers = data);
  }

  addCustomer() {
    this.selectedCustomer = { customerName: '', customerSurname: '', customerPhoneNumber: '', customerEmail: '' };
    this.displayForm = true;
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.displayForm = true;
  }

  deleteCustomer(customer: Customer) {
    this.confirmationService.confirm({
      message: `Delete customer ${customer.customerName}?`,
      accept: () => {
        this.customerService.deleteCustomer(customer.customerId!).subscribe(() => {
          this.messageService.add({severity:'success', summary:'Deleted', detail:'Customer deleted'});
          this.loadCustomers();
        });
      }
    });
  }

  viewOrders(customer: Customer) {
    this.selectedCustomer = customer;
    this.displayOrders = true;
  }

  // saveCustomer(customer: Customer) {
  //   if(customer.customerId){
  //     this.customerService.updateCustomer(customer.customerId, customer).subscribe(() => {
  //       this.displayForm = false;
  //       this.loadCustomers();
  //     });
  //   } else {
  //     this.customerService.addCustomer(customer).subscribe(() => {
  //       this.displayForm = false;
  //       this.loadCustomers();
  //     });
  //   }
  // }

  saveCustomer(customer: Customer) {
    if (customer.customerId) {
      this.customerService.updateCustomer(customer.customerId, customer).subscribe({
        next: () => {
          this.displayForm = false;
          this.loadCustomers();
          this.messageService.add({
            severity: 'success',
            summary: 'Customer Updated',
            detail: `${customer.customerName} was updated successfully.`,
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: 'Could not update customer. Please try again.',
          });
        },
      });
    } else {
      this.customerService.addCustomer(customer).subscribe({
        next: () => {
          this.displayForm = false;
          this.loadCustomers();
          this.messageService.add({
            severity: 'success',
            summary: 'Customer Added',
            detail: `${customer.customerName} was added successfully.`,
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Add Failed',
            detail: 'Could not add customer. Please try again.',
          });
        },
      });
    }
  }

}
