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
import ru.isu.ru.backend.model.Cart;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.BrandService;
import ru.isu.ru.backend.service.CartProductService;
import ru.isu.ru.backend.service.CartService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CartController {

    @Autowired
    private CartService service;

    @RequestMapping("/carts")
    public List<Cart> getAllCarts() {
        return service.getAllCarts();
    }
    
    @RequestMapping("/cart/{id}")
    public Cart getCart(@PathVariable("id") Integer id) {
        return service.getCartById(id);
        
    }
    @RequestMapping("/cart_for_user/{id}")
    public Cart getCartUser(@PathVariable("id") Integer id) {
        return service.getCartByUserId(id);
        
    }
    
    
    @PostMapping("/create/cart")
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart savedCart = service.createCart(cart);
        return new ResponseEntity<>(savedCart, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/delete/cart/{id}")
    public void deleteCart(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
