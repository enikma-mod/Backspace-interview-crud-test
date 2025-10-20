package com.backspace.technologies.crud.Repository;

import com.backspace.technologies.crud.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByIsAdmin(boolean isAdmin);
}
