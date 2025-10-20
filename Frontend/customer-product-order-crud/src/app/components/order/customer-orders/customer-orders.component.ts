
import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer.model';
import { CustomerOrder } from '../../../models/customer-order.model';
import { Product } from '../../../models/product.model';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-customer-orders',
  imports: [],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit{

  @Input() customerId!: number;

  orders: CustomerOrder[] = [];
  customers: Customer[] = [];
  products: Product[] = [];

  selectedOrder: CustomerOrder = {
    customer: {} as Customer,
    product: {} as Product,
    customerOrderQuantity: 1,
  };

  displayForm = false;
  isNew = true;

  constructor(
    private orderService: OrdersService, 
    private customerService: CustomerService,
    private productService: ProductService
  ) {}


  ngOnInit(): void {
    this.loadOrders();
    this.loadCustomers();
    this.loadProducts();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((data) => (this.orders = data));
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe((data) => (this.customers = data));
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => (this.products = data));
  }

  editOrder(order: CustomerOrder): void {
    this.selectedOrder = { ...order };
    this.isNew = false;
    this.displayForm = true;
  }


  saveOrder(): void {
    if (this.isNew) {
      this.orderService.addOrder(this.selectedOrder).subscribe(() => this.loadOrders());
    } else {
      this.orderService.updateOrder(this.selectedOrder.customerOrderId!, this.selectedOrder).subscribe(() => this.loadOrders());
    }
    this.displayForm = false;
  }


  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(() => this.loadOrders());
    }
  }

}
