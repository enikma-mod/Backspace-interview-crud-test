package com.backspace.technologies.crud.Model;
import jakarta.validation.constraints.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class CustomerOrder {
    @Id
    @Column(name = "customer_order_id")
    private Long customerOrderId;

    @NotBlank
    @Column(name = "customer_order_ref")
    private String orderReferenceNumber;

//  Each Order belongs to one customer
    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id")
    private Customer customer;

//    One product can appear in many orders
    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer customerOrderQuantity;

    private LocalDateTime createdAt;

    public CustomerOrder() {
    }

    public CustomerOrder(Long customerOrderId, Customer customer, String orderReferenceNumber, Integer customerOrderQuantity, Product product, LocalDateTime createdAt) {
        this.customerOrderId = customerOrderId;
        this.customer = customer;
        this.orderReferenceNumber = orderReferenceNumber;
        this.customerOrderQuantity = customerOrderQuantity;
        this.product = product;
        this.createdAt = createdAt;
    }

    public Long getCustomerOrderId() {
        return customerOrderId;
    }

    public void setCustomerOrderId(Long customerOrderId) {
        this.customerOrderId = customerOrderId;
    }

    public String getOrderReferenceNumber() {
        return orderReferenceNumber;
    }

    public void setOrderReferenceNumber(String orderReferenceNumber) {
        this.orderReferenceNumber = orderReferenceNumber;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getCustomerOrderQuantity() {
        return customerOrderQuantity;
    }

    public void setCustomerOrderQuantity(Integer customerOrderQuantity) {
        this.customerOrderQuantity = customerOrderQuantity;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}


