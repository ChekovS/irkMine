/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ru.isu.ru.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.Cart;
import ru.isu.ru.backend.model.CartProduct;

/**
 *
 * @author chekov
 */
public interface CartProductRepository extends JpaRepository<CartProduct, Long>{
    @Override
    List<CartProduct> findAll();
    
    @Query("SELECT cp FROM CartProduct cp WHERE cp.id = :id")
    CartProduct findById(@Param("id") Integer id);
    
    @Query("SELECT cp FROM CartProduct cp WHERE cp.cart.id = :id")
    List<CartProduct> findAllByCartId(@Param("id") Integer id);

    @Override
    public void delete(CartProduct t);

    @Override
    CartProduct save(CartProduct cart_product);
  
    
}
