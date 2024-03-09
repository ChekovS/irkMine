/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.User;

import ru.isu.ru.backend.repository.UserRepository;
import ru.isu.ru.backend.service.ProductService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class ProductController {

    @Autowired
    private ProductService service;

    @RequestMapping("/products")
    public List<Product> getAllProducts() {
        List<Product> ans = service.getAllProducts();
        return ans;
    }
    
    @RequestMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Integer id) {
        return service.getProductById(id);
        
    }
    @PostMapping("/delete/product/{id}")
    public void deleteProduct(@PathVariable("id") Integer id) {
        service.deleteProduct(id);
    }

    @PostMapping("/create/product")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = service.createProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    
    @PostMapping("/update/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Integer id, @RequestBody Product newProduct) {
        Product updatedProduct = service.updateProduct(id, newProduct);
        return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED);
    }
}
