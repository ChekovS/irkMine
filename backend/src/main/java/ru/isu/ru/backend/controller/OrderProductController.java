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
import ru.isu.ru.backend.model.OrderProduct;
import ru.isu.ru.backend.service.OrderProductService;
import ru.isu.ru.backend.service.OrderService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class OrderProductController {

    @Autowired
    private OrderProductService service;

    @RequestMapping("/order_products")
    public List<OrderProduct> getAllOrderProducts() {
        List<OrderProduct> ans = service.getAllOrderProducts();
        return ans;
    }
    
    @RequestMapping("/order_products_by_order/{id}")
    public List<OrderProduct> getAllOrderProductsForOrderId(@PathVariable("id") Integer id) {
        List<OrderProduct> ans = service.getAllOrderProductsByOrder(id);
        return ans;
    }
    
    @RequestMapping("/order_product/{id}")
    public OrderProduct getOrderProduct(@PathVariable("id") Integer id) {
        return service.getOrderProductById(id);
        
    }
    @DeleteMapping("/delete/order_product/{id}")
    public void deleteOrderProduct(@PathVariable("id") Integer id) {
        service.deleteOrderProduct(id);
    }
    
    
    @PostMapping("/create/order_product")
    public ResponseEntity<OrderProduct> createOrderProduct(@RequestBody OrderProduct order_product) {
        OrderProduct savedOrderProduct = service.createOrderProduct(order_product);
        return new ResponseEntity<>(savedOrderProduct, HttpStatus.CREATED);
    } 
}
