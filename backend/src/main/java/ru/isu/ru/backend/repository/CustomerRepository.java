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
import ru.isu.ru.backend.model.Customer;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface CustomerRepository extends JpaRepository<Customer, Long>{
    @Override
    List<Customer> findAll();
    

    @Query("SELECT c FROM Customer c WHERE c.id = :id")
    Customer findById(@Param("id") Integer id);
    
    @Query("SELECT c FROM Customer c WHERE c.user.id = :id")
    Customer findByUserId(@Param("id") Integer id);

    @Modifying
    @Query("UPDATE Customer c SET c.user = :user, c.firstName =:firstName, c.email = :email, c.lastName=:lastName  WHERE c.id = :id")
    void updateCustomer(@Param("id") Integer id, @Param("user") User user,@Param("firstName") String firstName, @Param("email") String email, @Param("lastName") String lastName);

    @Modifying
    @Query("DELETE FROM Customer c WHERE c.id = :id")
    void deleteCustomer(@Param("id") Integer id);
    
    @Override
    Customer save(Customer customer);
    
}
