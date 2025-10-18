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
        Optional<Customer> customerById = customerRepository.findById(customerId);

        if(customerById.isPresent()) {
            Customer updatedCustomer = customerById.get();

            updatedCustomer.setCustomerId(customer.getCustomerId());
            updatedCustomer.setCustomerName(customer.getCustomerName());
            updatedCustomer.setCustomerSurname(customer.getCustomerSurname());
            updatedCustomer.setCustomerPhoneNumber(customer.getCustomerPhoneNumber());
            updatedCustomer.setCustomerEmail(customer.getCustomerEmail());
            return customerRepository.save(updatedCustomer);
        }
        return null;
    }

    @Override
    public String deleteCustomer(Long customerId) {
        customerRepository.deleteById(customerId);
        return "customer id" + customerId + "is deleted successfully";
    }


}
