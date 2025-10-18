package com.backspace.technologies.crud.Controller;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
//@CrossOrigin(origins = "http://localhost:8081")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/customer")
    public List<Customer> retrieveAllCustomers(){
        return customerService.listAllCustomers();
    }

    @PostMapping("/customer")
    public Customer addCustomer(@RequestBody Customer customer) {
        try {
            return customerService.addCustomer(customer);
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid customer data: " + e.getMessage());
            return null;
        } catch (Exception e) {
            System.out.println("An error occured while adding the customer: " + e.getMessage());
            return null;
        }

    }
}
