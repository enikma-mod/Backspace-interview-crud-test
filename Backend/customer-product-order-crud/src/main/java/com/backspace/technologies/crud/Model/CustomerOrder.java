package com.backspace.technologies.crud.Model;
import com.backspace.technologies.crud.utils.OrderNumberGenerator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "customer_orders")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CustomerOrder {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long customerOrderId;

    private String orderReferenceNumber;
    private int customerOrderQuantity;

    //Each order is linked to one customer
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnoreProperties("orders")
    private Customer customer;

    //Each order is linked to one product.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;


    public void generateReferenceNumber() {
        if (this.orderReferenceNumber == null || this.orderReferenceNumber.isEmpty()) {
            this.orderReferenceNumber = OrderNumberGenerator.generateOrderReference();
        }
    }

    public CustomerOrder() {
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

    public int getCustomerOrderQuantity() {
        return customerOrderQuantity;
    }

    public void setCustomerOrderQuantity(int customerOrderQuantity) {
        this.customerOrderQuantity = customerOrderQuantity;
    }

}


