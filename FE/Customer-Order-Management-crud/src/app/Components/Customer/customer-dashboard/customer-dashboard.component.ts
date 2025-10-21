import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerOrder } from '../../../Models/customer-order.model';
import { OrdersService } from '../../../services/orders.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../Models/product.model';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  orders: CustomerOrder[] = [];
  products: Product[] = [];
  showAddForm = false;
  editingOrder: CustomerOrder | null = null;
  orderForm: any = { productId: null, quantity: 1 };

  constructor(private orderService: OrdersService, private productService: ProductService) {}

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(data => this.orders = data);
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  saveOrder() {
    if (this.editingOrder) {
      this.orderService.updateOrder(this.editingOrder.customerOrderId!, this.orderForm).subscribe(() => {
        this.showAddForm = false;
        this.loadOrders();
      });
    } else {
      this.orderService.addOrder(this.orderForm).subscribe(() => {
        this.showAddForm = false;
        this.loadOrders();
      });
    }
  }

  editOrder(order: CustomerOrder) {
    this.editingOrder = order;
    this.orderForm = { productId: order.product.productId, quantity: order.customerOrderQuantity };
    this.showAddForm = true;
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe(() => this.loadOrders());
  }

}
