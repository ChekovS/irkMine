package ru.isu.ru.backend.model;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author chekov
 */
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name="name", nullable = false)
    private String name;
    
    @Column(name="price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    @Column(name="description")
    private String description;
    
    @Column(name="quantity", nullable = false)
    private Integer quantity;

    public Product() {
    }

    public Product(Integer id, String name, Double price, Brand brand, Category category, String description, Integer quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    
    
}
