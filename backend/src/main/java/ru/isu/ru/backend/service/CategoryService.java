/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.OrderProduct;
import ru.isu.ru.backend.repository.CategoryRepository;

/**
 *
 * @author chekov
 */
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository category_repository;
    

    public List<Category> getAllCategories() {
        return category_repository.findAll();
    }

    public Category getCategoryById(Integer id) {
        Category ans = category_repository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Category not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Category createCategory(Category category) {
        return category_repository.save(category);
    }

    public void deleteById(Integer id){
        Category category = getCategoryById(id);
        category_repository.delete(category);
    }
}
