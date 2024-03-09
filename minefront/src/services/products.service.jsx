import http from "../http-common";

class ProductsDataService {

    getAll() {
        return http.get("/product/products");
    }

    getAllSearch(params) {
        console.log({ params })
        return http.get("/product/productsSearch", { params });
    }

    getProductById(id) {
        return http.get("/product/getById/" + id);
    }

    updateProduct(data) {
        return http.post("/product/save/", data);
    }

    deleteProduct(id) {
        return http.post("/product/delete/" + id);
    }

}

export default new ProductsDataService();