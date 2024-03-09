/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;
import java.util.Date;
import java.util.Objects;
import java.util.logging.Logger;
import javax.persistence.*;
/**
 *
 * @author chekov
 */
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "login",nullable = false, unique = true)
    private String login;
    
    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "admin",nullable = false)
    private Boolean admin;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private Date date;

    public User() {
    }

    public User(Integer id, String login, String password, Boolean admin, Date date) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.admin = admin;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public Date getDate() {
        return date;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    
}
