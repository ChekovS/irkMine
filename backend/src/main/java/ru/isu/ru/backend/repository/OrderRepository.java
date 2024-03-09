/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ru.isu.ru.backend.repository;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface OrderRepository extends JpaRepository<Order, Long>{
    @Override
    List<Order> findAll();
       
    @Query("SELECT o FROM Order o WHERE o.id = :id")
    Order findById(@Param("id") Integer id);

    
    @Override
    Order save(Order order);

    @Override
    public void delete(Order t);
    
    
    
}
