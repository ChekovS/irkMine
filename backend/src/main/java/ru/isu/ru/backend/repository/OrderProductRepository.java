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
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.OrderProduct;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long>{
    @Override
    List<OrderProduct> findAll();
       
    @Query("SELECT op FROM OrderProduct op WHERE op.id = :id")
    OrderProduct findById(@Param("id") Integer id);
    
    @Query("SELECT op FROM OrderProduct op WHERE op.order.id = :id")
    List<OrderProduct> findByOrderId(@Param("id") Integer id);
    
    
    @Override
    OrderProduct save(OrderProduct order_product);

    @Modifying
    @Query("DELETE FROM OrderProduct op WHERE op.id = :id")
    void deleteOrderProduct(@Param("id") Integer id);
    
}
