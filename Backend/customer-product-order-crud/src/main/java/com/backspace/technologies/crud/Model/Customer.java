package com.backspace.technologies.crud.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_name")
    @NotBlank (message = "Customer Name is required")
    private String customerName;

    @Column(name = "customer_surname")
    @NotBlank (message = "Customer Surname is required")
    private String customerSurname;

    @Column(name = "customer_phone_nbr")
    private String customerPhoneNumber;

    @Column(name = "customer_email")
    @Email(message = "Invalid email format")
    private String customerEmail;

    public Long getCustomerId() {
        return customerId;
    }

    public Customer() {
    }


    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerSurname() {
        return customerSurname;
    }

    public void setCustomerSurname(String customerSurname) {
        this.customerSurname = customerSurname;
    }

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }


}
