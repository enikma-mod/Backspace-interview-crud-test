package com.backspace.technologies.crud.Service;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer registerCustomer(Customer customer) {
        Optional<Customer> existing = customerRepository.findByCustomerEmail(customer.getCustomerEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        customer.setCustomerPassword(passwordEncoder.encode(customer.getCustomerPassword()));
        return customerRepository.save(customer);
    }

    public Customer login(String email, String password) {
        Optional<Customer> user = customerRepository.findByCustomerEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getCustomerPassword())) {
            return user.get();
        } else {
            throw new RuntimeException("Invalid credentials");
        }
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
