/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Cart;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.OrderProduct;
import ru.isu.ru.backend.repository.CartRepository;

/**
 *
 * @author chekov
 */
@Service
public class CartService {
    @Autowired
    private CartRepository cart_repository;


    public List<Cart> getAllCarts() {
        return cart_repository.findAll();
    }
    public Cart getCartByUserId(Integer id){
        return cart_repository.findAllCartsByUser(id);
        
    }

    public Cart getCartById(Integer id) {
        Cart ans = cart_repository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Cart not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Cart createCart(Cart cart) {
        return cart_repository.save(cart);
    }


    public void deleteById(Integer id){
        Cart cart = getCartById(id);
        cart_repository.delete(cart);
    }
}
