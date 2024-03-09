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
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Override
    List<Category> findAll();
    
    @Query("SELECT c FROM Category c WHERE c.id = :id")
    Category findById(@Param("id") Integer id);
    
    @Override
    Category save(Category category);

    @Override
    public void delete(Category t);
}
