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
import org.springframework.stereotype.Repository;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface UserRepository extends JpaRepository<User, Long>{
    @Override
    List<User> findAll();
    

    
    @Query("SELECT u FROM User u WHERE u.id = :id")
    User findById(@Param("id") Integer id);
    
    @Query("SELECT u FROM User u WHERE u.login = :login AND u.password = :password")
    User findByLoginAndPassword(@Param("login") String login, @Param("password") String password);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :id")
    void deleteUser(@Param("id") Integer id);
    
    @Override
    User save(User user);

}
