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
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.service.OrderProductService;
import ru.isu.ru.backend.service.OrderService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class OrderController {

    @Autowired
    private OrderService service;

    @RequestMapping("/orders")
    public List<Order> getAllOrders() {
        List<Order> ans = service.getAllOrders();
        return ans;
    }
    
    @RequestMapping("/order/{id}")
    public Order getOrder(@PathVariable("id") Integer id) {
        return service.getOrderById(id);
        
    }

    @DeleteMapping("/delete/order/{id}")
    public void deleteOrder(@PathVariable("id") Integer id) {
        service.deleteOrder(id);
    }
    
    
    @PostMapping("/create/order")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = service.createOrder(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

}
