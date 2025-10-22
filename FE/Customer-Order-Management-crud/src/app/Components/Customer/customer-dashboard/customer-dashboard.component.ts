import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerOrder } from '../../../Models/customer-order.model';
import { OrdersService } from '../../../services/orders.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../Models/product.model';
import { ToastService } from '../../../services/toast.service';
import { Customer } from '../../../Models/customer.model';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  orders: CustomerOrder[] = [];
  customers: Customer[] = [];
  products: Product[] = [];
  showAddForm = false;
  showOrderForm: boolean = false 
  editingOrder: boolean = false;

  customerForm: Customer = {
      customerName: '',
      customerSurname: '',
      customerEmail: '',
      customerPhoneNumber: '',
      customerPassword: '',
      admin: false
  };
  
  productForm: Product = {
    productName: '',
    productDesc: '',
    productPrice: 0
  };

  orderForm: CustomerOrder = {
    orderReferenceNumber: '',
    customer: this.customerForm,
    product: this.productForm,
    customerOrderQuantity: 0
  };

  constructor(
    private orderService: OrdersService, 
    private productService: ProductService, 
    private toaster: ToastService,
    private customerService: CustomerService,) {}

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
    this.loadCustomers();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(data => this.orders = data);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  saveOrder() {
    const payload = {
      customerId: Number(this.orderForm.customer?.customerId),
      productId: Number(this.orderForm.product?.productId),
      customerOrderQuantity: Number(this.orderForm.customerOrderQuantity)
    }

    console.log('my playload ', payload);
    if (this.editingOrder && this.orderForm.customerOrderId) {
      this.orderService.updateOrder(this.orderForm.customerOrderId, this.orderForm).subscribe({
        next: () => {
          this.toaster.success("Order successfully Updated")
          this.loadOrders()
          this.toggleOrderForm();
        },
        error: (err) => console.error('Failed to update order', err),
      });
    } else {
      this.orderService.addOrder(payload).subscribe({
        next: () => {
          this.toaster.success("Order successfully Updated")
          this.loadOrders()
          this.toggleOrderForm();
        },
        error: (err) => {
          console.error('Failed to add order', err)
        }
      });
    }
  }

  toggleOrderForm(): void {
    this.showOrderForm = !this.showOrderForm;
    if (!this.showOrderForm) {
      this.resetOrderForm();
    }
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Failed to load customers', err)
    });
  }

  filterCustomer(): void {
    const id = this.orderForm.customer?.customerId;
    if (!id) return;

    this.customers = this.customers.filter(c => c.customerId === id);
  }

  resetOrderForm(): void {
    this.orderForm = {
      orderReferenceNumber: '',
      customerOrderQuantity: 0
    };
    this.editingOrder = false;
    this.showOrderForm = false;
  }

  editOrder(order: CustomerOrder): void {
    this.showOrderForm = true;
    this.editingOrder = true;
    this.orderForm = { ...order };
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe(() => this.loadOrders());
  }

}
