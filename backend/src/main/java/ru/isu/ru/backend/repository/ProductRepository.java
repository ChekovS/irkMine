package ru.isu.ru.backend.repository;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.isu.ru.backend.model.Product;
import ru.isu.ru.backend.model.Brand;
import ru.isu.ru.backend.model.CartProduct;
import ru.isu.ru.backend.model.Category;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author chekov
 */
public interface ProductRepository extends JpaRepository<Product, Long>{
    @Override
    List<Product> findAll();
       
    @Query("SELECT pr FROM Product pr WHERE pr.id = :id")
    Product findById(@Param("id") Integer id);

    @Override
    Product save(Product product);
    
    @Modifying
    @Query("UPDATE Product pr SET pr.name = :name, pr.price = :price, pr.brand = :brand, pr.category = :category, pr.description = :description, pr.quantity = :quantity WHERE pr.id = :id")
    void updateProduct(@Param("id") Integer id, @Param("name") String name, @Param("price") Double price,
                      @Param("brand") Brand brand, @Param("category") Category category, @Param("description") String description,
                      @Param("quantity") Integer quantity);

    @Modifying
    @Query("DELETE FROM Product pr WHERE pr.id = :id")
    void deleteProduct(@Param("id") Integer id);    
}
