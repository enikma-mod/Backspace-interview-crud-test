package com.backspace.technologies.crud.Service;

import com.backspace.technologies.crud.Model.Product;
import com.backspace.technologies.crud.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product updated) {
        Product existing = productRepository.findById(productId).orElse(null);
        if (existing != null) {
            existing.setProductName(updated.getProductName());
            existing.setProductDesc(updated.getProductDesc());
            existing.setProductPrice(updated.getProductPrice());
            return productRepository.save(existing);
        }
        return null;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
