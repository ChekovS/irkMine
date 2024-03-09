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
import ru.isu.ru.backend.model.Cart;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.CartProductService;
import ru.isu.ru.backend.service.CategoryService;
import ru.isu.ru.backend.service.ProductService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CartProductController {

    @Autowired
    private CartProductService service;

    @RequestMapping("/cart_products")
    public List<CartProduct> getAllCartProducts() {
        return service.getAllCartProducts();
    }
    
    @RequestMapping("/cart_product/{id}")
    public CartProduct getCartProduct(@PathVariable("id") Integer id) {
        return service.getCartProductById(id); 
    }
    @RequestMapping("/cart_product_by_cart/{id}")
    public List<CartProduct> getCartProductsByCartId(@PathVariable("id") Integer id) {
        return service.getAllCartProductsByCart(id); 
    }

    @PostMapping("/create/cart_product")
    public ResponseEntity<CartProduct> createCartProduct(@RequestBody CartProduct cart_product) {
        CartProduct savedCartProduct = service.createCartProduct(cart_product);
        return new ResponseEntity<>(savedCartProduct, HttpStatus.CREATED);
    }
    
    @DeleteMapping(value = "/delete/cart_product/{id}")
    public void deleteCartProduct(@PathVariable Integer id) {
        service.deleteCartProduct(id);
    }
    
    @PostMapping("/update/cart_product/{id}")
    public ResponseEntity<CartProduct> updateCartProduct(@PathVariable("id") Integer id, @RequestBody CartProduct newCartProduct) {
        CartProduct updatedCartProduct = service.updateCartProduct(id, newCartProduct);
        return new ResponseEntity<>(updatedCartProduct, HttpStatus.CREATED);
    }

}
