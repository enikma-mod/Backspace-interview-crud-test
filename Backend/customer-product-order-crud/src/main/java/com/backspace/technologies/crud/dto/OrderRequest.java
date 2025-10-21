package com.backspace.technologies.crud.dto;

public class OrderRequest {
    private Long customerId;
    private Long productId;
    private int customerOrderQuantity;

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getCustomerOrderQuantity() {
        return customerOrderQuantity;
    }

    public void setCustomerOrderQuantity(int customerOrderQuantity) {
        this.customerOrderQuantity = customerOrderQuantity;
    }
}
