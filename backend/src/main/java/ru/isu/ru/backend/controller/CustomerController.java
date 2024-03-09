/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.Customer;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.BrandService;
import ru.isu.ru.backend.service.CustomerService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CustomerController {

    @Autowired
    private CustomerService service;

    @RequestMapping("/customers")
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    @RequestMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable("id") Integer id) {
        return service.getCustomerById(id);
     
    }
    @RequestMapping("/customer_by_user/{id}")
    public Customer getCustomerByUser(@PathVariable("id") Integer id) {
        return service.getCustomerByUserId(id);
     
    }
    @PostMapping("/create/customer")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer savedCustomer = service.createCustomer(customer);
        return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
    }
    @PostMapping("/update/customer/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable("id") Integer id, @RequestBody Customer newCustomer) {
        Customer updatedCustomer = service.updateCustomer(id, newCustomer);
        return new ResponseEntity<>(updatedCustomer, HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/delete/customer/{id}")
    public void deleteCustomer(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
