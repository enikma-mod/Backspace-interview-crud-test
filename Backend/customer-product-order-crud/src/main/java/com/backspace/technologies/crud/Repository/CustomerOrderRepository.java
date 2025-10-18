package com.backspace.technologies.crud.Repository;

import com.backspace.technologies.crud.Model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {

    List<CustomerOrder> findByCustomerId(Long customerId);
    Optional<CustomerOrder> findByOrderReferenceNumber(String orderReferenceNumber);
}