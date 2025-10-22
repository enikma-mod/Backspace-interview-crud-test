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
import { ToastService } from '../../../services/toast.service';

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
    customer: this.customerForm,
    product: this.productForm,
    customerOrderQuantity: 0
  };

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrdersService,
    private toaster: ToastService
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
          this.toaster.success("User successfully Updated")
        },
        error: (err) => {
          this.toaster.error("Failed to update customer details")
          console.error('Failed to update product', err)
        }
      });
    } else {
      this.customerService.addCustomer(this.customerForm).subscribe({
        next: () => {
          this.loadCustomers();
          this.resetCustomerForm();
           this.toaster.success("User successfully added")
        },
        error: (err) => {
          this.toaster.error("Failed to add customer")
          console.error('Failed to add product', err)
        }
         
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
    this.editingCustomer = false;
    this.showCustomerForm = false;
  }

  editCustomer(customer: Customer): void {
    this.showCustomerForm = true;
    this.editingCustomer = true;
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
          this.toaster.success("Product successfully Updated")
        },
        error: (err) => console.error('Failed to update product', err),
      });
    } else {
      this.productService.addProduct(this.productForm).subscribe({
        next: () => {
          this.loadProducts();
          this.resetProductForm();
        },
        error: (err) => {
          this.toaster.error("Failed to add product")
          console.error('Failed to add product', err)
        }
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
      this.resetOrderForm();
    }
  }



  saveOrder(): void {
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


  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => this.loadOrders(),
        error: (err) => console.error('Failed to delete order', err)
      });
    }
  }
}