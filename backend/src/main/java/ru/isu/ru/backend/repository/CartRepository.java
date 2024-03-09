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
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.Cart;
import ru.isu.ru.backend.model.Customer;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface CartRepository extends JpaRepository<Cart, Long>{
    @Override
    List<Cart> findAll();
    
    
    @Query("SELECT c FROM Cart c WHERE c.id = :id")
    Cart findById(@Param("id") Integer id);
    
    @Modifying
    @Query("UPDATE Cart c SET c.user = :user WHERE c.id = :id")
    void updateCart(@Param("id") Integer id, @Param("user") User user);

    @Modifying
    @Query("DELETE FROM Cart c WHERE c.id = :id")
    void deleteCart(@Param("id") Integer id);
    
    @Query("SELECT c FROM Cart c WHERE c.user.id = :id")
    Cart findAllCartsByUser(@Param("id") Integer id);
    
    @Override
    Cart save(Cart cart);
  
    
}
