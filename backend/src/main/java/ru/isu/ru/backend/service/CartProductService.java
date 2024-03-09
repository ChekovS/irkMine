/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.Cart;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.UserRepository;
import ru.isu.ru.backend.repository.CartProductRepository;
import ru.isu.ru.backend.repository.CartRepository;

/**
 *
 * @author chekov
 */
@Service
public class CartProductService {
    @Autowired
    private CartProductRepository cart_product_repository;
    
 public List<CartProduct> getAllCartProducts() {
        return cart_product_repository.findAll();
    }
 
  public List<CartProduct> getAllCartProductsByCart(Integer id) {
        return cart_product_repository.findAllByCartId(id);
    }
    
    public CartProduct getCartProductById(Integer id) {
        CartProduct ans = cart_product_repository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("CartProduct not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public CartProduct createCartProduct(CartProduct cart_product) {
        return cart_product_repository.save(cart_product);
    }

    public CartProduct updateCartProduct(Integer id, CartProduct updatedCartProduct) {
        CartProduct cart_product = getCartProductById(id);
        cart_product.setProduct(updatedCartProduct.getProduct());
        cart_product.setCart(updatedCartProduct.getCart());
        cart_product.setQuantity(updatedCartProduct.getQuantity());
        return cart_product_repository.save(cart_product);
    }

    public void deleteCartProduct(Integer id) {
        CartProduct cart_product = getCartProductById(id);
        cart_product_repository.delete(cart_product);
    }
}
