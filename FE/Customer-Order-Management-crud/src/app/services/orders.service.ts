import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CustomerOrder } from '../Models/customer-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}


  getAllOrders(): Observable<CustomerOrder[]> {
    return this.http.get<CustomerOrder[]>(`${this.baseUrl}/orders`);
  }

  getOrdersByCustomerId(customerId: number): Observable<CustomerOrder[]> {
    return this.http.get<CustomerOrder[]>(`${this.baseUrl}/orders/customer/${customerId}`);
  }

  getOrderById(orderId: number): Observable<CustomerOrder> {
    return this.http.get<CustomerOrder>(`${this.baseUrl}/orders/${orderId}`);
  }


  addOrder(order: CustomerOrder): Observable<CustomerOrder> {
    return this.http.post<CustomerOrder>(`${this.baseUrl}/orders`, order);
  }

  updateOrder(p0: number, order: CustomerOrder): Observable<CustomerOrder> {
    return this.http.put<CustomerOrder>(`${this.baseUrl}/orders/${order.customerOrderId}`, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/orders/${orderId}`);
  }
}
