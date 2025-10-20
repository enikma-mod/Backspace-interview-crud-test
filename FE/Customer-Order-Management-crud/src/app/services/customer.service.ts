import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../Models/customer.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = environment.apiBaseURL;
  private endpoints = environment.apiEndpoints;

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}${this.endpoints.customers_get_all}`);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}${this.endpoints.customers_get_one}${customerId}`);
  }

  

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseURL}${this.endpoints.customers_add}`, customer);
  }

  updateCustomer(customerId: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseURL}${this.endpoints.customers_update}${customerId}`, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}${this.endpoints.customers_delete}${customerId}`);
  }


}
