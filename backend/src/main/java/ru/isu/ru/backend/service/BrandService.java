/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.BrandRepository;
import ru.isu.ru.backend.repository.UserRepository;
import ru.isu.ru.backend.repository.CartRepository;

/**
 *
 * @author chekov
 */
@Service
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;


    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }
    
    public Brand getBrandById(Integer id) {
        Brand ans = brandRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Brand not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }


    public void deleteBrand(Integer id) {
        Brand brand = getBrandById(id);
        brandRepository.delete(brand);
    }
}
