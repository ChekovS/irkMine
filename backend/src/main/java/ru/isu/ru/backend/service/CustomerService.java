/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.Customer;
import ru.isu.ru.backend.repository.OrderRepository;
import ru.isu.ru.backend.repository.CategoryRepository;
import ru.isu.ru.backend.repository.CustomerRepository;

/**
 *
 * @author chekov
 */
@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customer_repository;


    public List<Customer> getAllCustomers() {
        return customer_repository.findAll();
    }

    
    public Customer getCustomerById(Integer id) {
        Customer ans = customer_repository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Customer not found with ID: " + id);
        }
        else{
        return ans;
        }
    }
    public Customer getCustomerByUserId(Integer id) {
        Customer ans = customer_repository.findByUserId(id);
        if (ans == null){
            throw new NoSuchElementException("Customer not found with user ID: " + id);
        }
        else{
            return ans;
        }
    }

    public Customer createCustomer(Customer customer) {
        return customer_repository.save(customer);
    }

    public Customer updateCustomer(Integer id, Customer updatedCustomer) {
        Customer customer = getCustomerById(id);
        customer.setFirstName(updatedCustomer.getFirstName());
        customer.setEmail(updatedCustomer.getEmail());
        customer.setLastName(updatedCustomer.getLastName());
        customer.setUser(updatedCustomer.getUser());
        return customer_repository.save(customer);
    }

    public void deleteById(Integer id){
        Customer customer = getCustomerById(id);
        customer_repository.delete(customer);
    }
}
