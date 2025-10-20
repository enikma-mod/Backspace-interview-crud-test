package com.backspace.technologies.crud.Controller;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Model.CustomerOrder;
import com.backspace.technologies.crud.Service.CustomerOrderService;
import com.backspace.technologies.crud.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerOrderService orderService;

    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Long customerId){
        return customerService.getCustomerById(customerId);
    }

    @GetMapping("/role/{isAdmin}")
    public List<Customer> getCustomersByRole(@PathVariable boolean isAdmin) {
        return customerService.getCustomersByRole(isAdmin);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @PutMapping("/{customerId}")
    public Customer updateCustomer(@PathVariable("customerId") Long customerId, @RequestBody Customer customer) {
        return customerService.updateCustomer(customerId, customer);
    }

    @DeleteMapping("/{customerId}")
    public String deleteCustomer(@PathVariable Long customerId) {
        customerService.deleteCustomer(customerId);
        return("Customer deleted successfully");
    }

}
