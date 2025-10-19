package com.backspace.technologies.crud.Service;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long customerId, Customer updated) {
        Customer existing = getCustomerById(customerId);
        if (existing != null) {
            existing.setCustomerName(updated.getCustomerName());
            existing.setCustomerSurname(updated.getCustomerSurname());
            existing.setCustomerPhoneNumber(updated.getCustomerPhoneNumber());
            existing.setCustomerEmail(updated.getCustomerEmail());
            return customerRepository.save(existing);
        }
        return null;
    }

    public void deleteCustomer(Long customerId) {
        customerRepository.deleteById(customerId);
    }

}
