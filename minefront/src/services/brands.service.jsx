import http from "../http-common";

class BrandsDataService {

    getAll() {
        return http.get("/brand/brands");
    }

    getAllSearch(params) {
        console.log({ params })
        return http.get("/brand/brandsSearch", { params });
    }

    getBrandById(id) {
        return http.get("/brand/getById/" + id);
    }

    updateBrand(data) {
        return http.post("/brand/save/", data);
    }

    deleteBrand(id) {
        return http.post("/brand/delete/" + id);
    }

}

export default new BrandsDataService();