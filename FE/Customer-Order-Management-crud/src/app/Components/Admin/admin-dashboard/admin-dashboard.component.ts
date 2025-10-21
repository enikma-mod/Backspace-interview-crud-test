import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerOrder } from '../../../Models/customer-order.model';
import { Product } from '../../../Models/product.model';
import { Customer } from '../../../Models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { OrdersService } from '../../../services/orders.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  customers: Customer[] = [];
  orders: CustomerOrder[] = [];

  products: Product[] = [];
  showProductForm: boolean = false;
  showCustomerForm: boolean = false;
  showOrderForm: boolean = false 

  editingCustomer: boolean = false
  editingProduct: boolean = false;
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
    customerOrderQuantity: 0
  };

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Failed to load products', err),
    });
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Failed to load customers', err)
    });
  }


  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  // -------------------------------- CUSTOMER METHODS ------------------------------------------
  toggleCustomerForm(): void {
    this.showCustomerForm = !this.showCustomerForm;
    if (!this.showCustomerForm) {
      this.resetCustomerForm();
    }
  }

  saveCustomer(): void {
    if (this.editingCustomer && this.customerForm.customerId) {
      this.customerService.updateCustomer(this.customerForm.customerId, this.customerForm).subscribe({
        next: () => {
          this.loadCustomers();
          this.resetCustomerForm();
        },
        error: (err) => console.error('Failed to update product', err),
      });
    } else {
      this.customerService.addCustomer(this.customerForm).subscribe({
        next: () => {
          this.loadCustomers();
          this.resetCustomerForm();
        },
        error: (err) => console.error('Failed to add product', err),
      });
    }
  }

  resetCustomerForm(): void {
    this.customerForm = {
      customerName: '',
      customerSurname: '',
      customerEmail: '',
      customerPhoneNumber: '',
      customerPassword: '',

    };
    this.editingProduct = false;
    this.showProductForm = false;
  }

  editCustomer(customer: Customer): void {
    this.showCustomerForm = true;
    this.editingProduct = true;
    this.customerForm = { ...customer };
  }


  deleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => console.error('Failed to delete customer', err)
      });
    }
  }

  //----------------------------- PRODUCT METHODS ----------------------------------


  toggleProductForm(): void {
    this.showProductForm = !this.showProductForm;
    if (!this.showProductForm) {
      this.resetProductForm();
    }
  }

  saveProduct(): void {
    if (this.editingProduct && this.productForm.productId) {
      this.productService.updateProduct(this.productForm.productId, this.productForm).subscribe({
        next: () => {
          this.loadProducts();
          this.resetProductForm();
        },
        error: (err) => console.error('Failed to update product', err),
      });
    } else {
      this.productService.addProduct(this.productForm).subscribe({
        next: () => {
          this.loadProducts();
          this.resetProductForm();
        },
        error: (err) => console.error('Failed to add product', err),
      });
    }
  }

  editProduct(product: Product): void {
    this.showProductForm = true;
    this.editingProduct = true;
    this.productForm = { ...product };
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Failed to delete product', err),
      });
    }
  }

  resetProductForm(): void {
    this.productForm = {
      productName: '',
      productDesc: '',
      productPrice: 0
    };
    this.editingProduct = false;
    this.showProductForm = false;
  }



  toggleOrderForm(): void {
    this.showOrderForm = !this.showOrderForm;
    if (!this.showOrderForm) {
      this.resetProductForm();
    }
  }

  saveOrder(): void {
    if (this.editingOrder && this.orderForm.customerOrderId) {
      this.orderService.updateOrder(this.orderForm.customerOrderId, this.orderForm).subscribe({
        next: () => {
          this.loadOrders()
          this.toggleOrderForm();
        },
        error: (err) => console.error('Failed to update order', err),
      });
    } else {
      this.orderService.addOrder(this.orderForm).subscribe({
        next: () => {
          this.loadOrders()
          this.toggleOrderForm();
        },
        error: (err) => console.error('Failed to add order', err),
      });
    }
  }

    resetOrderForm(): void {
    this.orderForm = {
      orderReferenceNumber: '',
      customerOrderQuantity: 0
    };
    this.editingOrder = false;
    this.showOrderForm = false;
  }

  


  // ===== ORDER METHODS =====
  // addOrder(): void {
  //   const customerId = prompt('Enter Customer ID:');
  //   const productId = prompt('Enter Product ID:');
  //   const quantity = prompt('Enter Quantity:');

  //   if (customerId && productId && quantity) {
  //     this.orderService.addOrder(+customerId, +productId, +quantity).subscribe({
  //       next: () => this.loadOrders(),
  //       error: (err) => console.error('Failed to add order', err)
  //     });
  //   }
  // }

  // editOrder(order: CustomerOrder): void {
  //   const productId = prompt('Enter new Product ID (or leave empty):', order.product?.productId?.toString() || '');
  //   const quantity = prompt('Enter new Quantity (or leave empty):', order.customerOrderQuantity?.toString() || '');

  //   this.orderService.updateOrder(order.customerOrderId!, productId ? +productId : undefined, quantity ? +quantity : undefined).subscribe({
  //     next: () => this.loadOrders(),
  //     error: (err) => console.error('Failed to update order', err)
  //   });
  // }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => this.loadOrders(),
        error: (err) => console.error('Failed to delete order', err)
      });
    }
  }

}
