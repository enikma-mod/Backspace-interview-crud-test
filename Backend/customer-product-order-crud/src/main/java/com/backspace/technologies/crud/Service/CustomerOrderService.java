package com.backspace.technologies.crud.Service;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Model.CustomerOrder;
import com.backspace.technologies.crud.Model.Product;
import com.backspace.technologies.crud.Repository.CustomerOrderRepository;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import com.backspace.technologies.crud.Repository.ProductRepository;
import com.backspace.technologies.crud.utils.OrderNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerOrderService {

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CustomerOrder> getAllOrders() {
        return customerOrderRepository.findAll();
    }

    public CustomerOrder getOrderById(Long id) {
        return customerOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<CustomerOrder> getOrdersByCustomer(Long customerOrderId) {
        return customerOrderRepository.findByCustomerOrderId(customerOrderId);
    }

    public CustomerOrder createOrder(Long customerId, Long productId, int customerOrderQuantity) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CustomerOrder order = new CustomerOrder();
        order.setCustomer(customer);
        order.setProduct(product);
        order.setCustomerOrderQuantity(customerOrderQuantity);
        order.setOrderReferenceNumber(OrderNumberGenerator.generateOrderReference());

        return customerOrderRepository.save(order);
    }


    public CustomerOrder updateOrder(Long orderId, Long productId, Integer quantity) {
        CustomerOrder order = customerOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (productId != null) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            order.setProduct(product);
        }

        if (quantity != null) {
            order.setCustomerOrderQuantity(quantity);
        }

        return customerOrderRepository.save(order);
    }

    public void deleteOrder(Long customerId) {
        customerOrderRepository.deleteById(customerId);
    }
}
