/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.OrderProduct;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.CartService;
import ru.isu.ru.backend.service.CategoryService;
import ru.isu.ru.backend.service.ProductService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CategoryController {

    @Autowired
    private CategoryService service;

    @RequestMapping("/categories")
    public List<Category> getAllCategories() {
        List<Category> ans = service.getAllCategories();
        return ans;
    }
    
    @RequestMapping("/category/{id}")
    public Category getCategory(@PathVariable("id") Integer id) {
        return service.getCategoryById(id);
        
    }

    @PostMapping("/create/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = service.createCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/delete/category/{id}")
    public void deleteCategory(@PathVariable Integer id) {
        service.deleteById(id);
    }

    

}
