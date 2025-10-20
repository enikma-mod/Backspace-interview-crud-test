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

    public List<Customer> getCustomersByRole(boolean isAdmin) {
        return customerRepository.findByIsAdmin(isAdmin);
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        return customerRepository.findById(id)
                .map(existingCustomer -> {
                    existingCustomer.setCustomerName(updatedCustomer.getCustomerName());
                    existingCustomer.setCustomerSurname(updatedCustomer.getCustomerSurname());
                    existingCustomer.setCustomerEmail(updatedCustomer.getCustomerEmail());
                    existingCustomer.setCustomerPhoneNumber(updatedCustomer.getCustomerPhoneNumber());
                    existingCustomer.setAdmin(updatedCustomer.isAdmin());
                    return customerRepository.save(existingCustomer);
                })
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public void deleteCustomer(Long customerId) {
        customerRepository.deleteById(customerId);
    }

}
