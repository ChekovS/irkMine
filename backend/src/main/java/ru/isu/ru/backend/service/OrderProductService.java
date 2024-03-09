/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.OrderProduct;
import ru.isu.ru.backend.repository.OrderProductRepository;
import ru.isu.ru.backend.repository.OrderRepository;

/**
 *
 * @author chekov
 */
@Service
public class OrderProductService {
    @Autowired
    private OrderProductRepository order_product_repository;


    public List<OrderProduct> getAllOrderProducts() {
        return order_product_repository.findAll();
    }
    
    public List<OrderProduct> getAllOrderProductsByOrder(Integer id) {
        return order_product_repository.findByOrderId(id);
    }
    
    public OrderProduct getOrderProductById(Integer id) {
        OrderProduct ans = order_product_repository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("OrderProduct not found with ID: " + id);
        }
        else{
        return ans;
        }
    }
    

    public OrderProduct createOrderProduct(OrderProduct order_product) {
        return order_product_repository.save(order_product);
    }


    public void deleteOrderProduct(Integer id) {
        OrderProduct order_product = getOrderProductById(id);
        order_product_repository.delete(order_product);
    }  
}
