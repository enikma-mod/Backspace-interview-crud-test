package com.backspace.technologies.crud.Controller;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Model.CustomerOrder;
import com.backspace.technologies.crud.Model.Product;
import com.backspace.technologies.crud.Repository.CustomerOrderRepository;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import com.backspace.technologies.crud.Repository.ProductRepository;
import com.backspace.technologies.crud.Service.CustomerOrderService;
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
    public CustomerOrder createOrder(@RequestBody Map<String, Object> orderRequest) {
        Long customerId = ((Number) orderRequest.get("customerId")).longValue();
        Long productId = ((Number) orderRequest.get("productId")).longValue();
        int quantity = (int) orderRequest.get("customerOrderQuantity");
        return orderService.createOrder(customerId, productId, quantity);
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
