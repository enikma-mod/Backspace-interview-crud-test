package com.backspace.technologies.crud.Service;

import com.backspace.technologies.crud.Model.Customer;

import java.util.List;

public interface CustomerService {

    List<Customer> listAllCustomers();
    Customer addCustomer(Customer customer);
    Customer updateCustomer(Long customerId, Customer customer);
    String deleteCustomer(Long customerId);

}
