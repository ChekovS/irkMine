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
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.Cart;

/**
 *
 * @author chekov
 */
public interface BrandRepository extends JpaRepository<Brand, Long>{
    @Override
    List<Brand> findAll();
    
    @Query("SELECT b FROM Brand b WHERE b.id = :id")
    Brand findById(@Param("id") Integer id);

    @Override
    public void delete(Brand t);

    @Override
    Brand save(Brand brand);
 
    
}
