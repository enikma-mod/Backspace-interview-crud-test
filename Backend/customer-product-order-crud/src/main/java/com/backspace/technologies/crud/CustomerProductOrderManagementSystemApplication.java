package com.backspace.technologies.crud;

import com.backspace.technologies.crud.Model.Customer;
import com.backspace.technologies.crud.Repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CustomerProductOrderManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerProductOrderManagementSystemApplication.class, args);
	}

	//Default Admin added
//	@Bean
//	public CommandLineRunner initAdmin(CustomerRepository customerRepository) {
//		return args -> {
//			if (customerRepository.count() == 0) {
//				Customer admin = new Customer();
//				admin.setCustomerName("Admin");
//				admin.setCustomerPassword("admin@12345");
//				admin.setAdmin(true);
//				admin.setCustomerEmail("admin@system.com");
//				customerRepository.save(admin);
//				System.out.println("Default admin user created");
//			}
//		};
//	}

}
