package ru.isu.ru.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.Order;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.BrandService;

/**
 *
 * @author chekov
 */
@RestController
@CrossOrigin(origins = { "*" })
public class BrandController {

    @Autowired
    private BrandService service;

    @RequestMapping("/brands")
    public List<Brand> getAllBrands() {
        return service.getAllBrands();
    }
    
    @RequestMapping("/brand/{id}")
    public Brand getBrand(@PathVariable("id") Integer id) {
        return service.getBrandById(id);
        
    }

    
    @PostMapping("/create/brand")
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        Brand savedBrand = service.createBrand(brand);
        return new ResponseEntity<>(savedBrand, HttpStatus.CREATED);
    }

}
