package com.backspace.technologies.crud.Controller;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Model.CustomerOrder;
import com.backspace.technologies.crud.Model.Product;
import com.backspace.technologies.crud.Repository.CustomerOrderRepository;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import com.backspace.technologies.crud.Repository.ProductRepository;
import com.backspace.technologies.crud.Service.CustomerOrderService;
import com.backspace.technologies.crud.dto.OrderRequest;
import com.backspace.technologies.crud.utils.OrderNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/orders")
public class CustomerOrderController {

    @Autowired
    private CustomerOrderService orderService;

    @GetMapping
    public List<CustomerOrder> listAll() {
        return orderService.getAllOrders();
    }

    @PostMapping
    public CustomerOrder createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(
                orderRequest.getCustomerId(),
                orderRequest.getProductId(),
                orderRequest.getCustomerOrderQuantity()
        );
    }


    @PutMapping("/{customerOrderId}")
    public CustomerOrder updateOrder(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Long productId = request.containsKey("productId") ? ((Number) request.get("productId")).longValue() : null;
        Integer quantity = request.containsKey("customerOrderQuantity") ? (Integer) request.get("customerOrderQuantity") : null;
        return orderService.updateOrder(id, productId, quantity);
    }

    @DeleteMapping("/{customerOrderId}")
    public void deleteOrder(@PathVariable Long customerOrderId) {
        orderService.deleteOrder(customerOrderId);
    }


}
