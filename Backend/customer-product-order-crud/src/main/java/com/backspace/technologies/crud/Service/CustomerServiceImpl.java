package com.backspace.technologies.crud.Service;
import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<Customer> listAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long customerId, Customer customer) {
        Customer existingCustomer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));

        existingCustomer.setCustomerName(customer.getCustomerName());
        existingCustomer.setCustomerSurname(customer.getCustomerSurname());
        existingCustomer.setCustomerPhoneNumber(customer.getCustomerPhoneNumber());
        existingCustomer.setCustomerEmail(customer.getCustomerEmail());
        return customerRepository.save(existingCustomer);
    }

    @Override
    public String deleteCustomer(Long customerId) {
        customerRepository.deleteById(customerId);
        return "customer id" + customerId + "is deleted successfully";
    }


}
