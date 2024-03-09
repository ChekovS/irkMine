import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import http from '../../http-common';
import { connect } from "react-redux";



function AddProduct(){
    const [product, setProduct] = useState({
        id: "",
        name: "",
        country: "",
        description: "",

    });
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name_brand, setname_brand] = useState("");
    const [description_brand, setdescription_brand] = useState("");
    const [country_brand, setcountry_brand] = useState("");
    const homenavigate = () => {
        alert("Запись создана!")
        navigate('/', {replace: true});
      };
    
    const CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await http.get(`/categories`);
                setCategories(categories.data);
                
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    });
    async function handleCreation(e) {

        const brandData = {
            country: country_brand,
            description: description_brand,
            name: name_brand,
        };
        try {
            const response1 = await http.get(`/category/${value}`);
            console.log(response1.data)
            const response = await http.post(`/create/brand`, brandData, { 'Content-Type': 'application/json' });
            console.log(response.data)
            const productData = {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                brand: response.data,
                category: response1.data,
            };
            const response2 = await http.post(`/create/product`, productData, { 'Content-Type': 'application/json' });
            console.log(response2.data);
            homenavigate();
        } catch (e) {
            console.log(e);
        }
    
    }
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [quantity, setquantity] = useState("");
    const [value, setValue] = useState(1);

    function handleChangeName(ev){
        setname(ev.target.value)
    }
    function handleChangename_brand(ev){
        setname_brand(ev.target.value)
    }
    function handleChangeDescription_brand(ev){
        setdescription_brand(ev.target.value)
    }
    function handleChangeCountry(ev){
        setcountry_brand(ev.target.value)
    }


    function handleChangePrice(ev){
        setprice(ev.target.value)
    }

    function handleChangeDescription(ev){
        setdescription(ev.target.value)
    }

    function handleChangeQuantity(ev){
        setquantity(ev.target.value)
    }
    const handleChangeSelect = (e) => {
        setValue(e.target.value);
      };

    return(

            <div className='col-sm-10'>
                <h4>Создайте новый товар!</h4>

                <form onSubmit={handleCreation}>
                    <div className="form-group mb-8">
                        <input type="text" name="name" value={name} placeholder="Наименование товара" onChange={handleChangeName} className="form-control" />
                    </div>
                    <div className="form-group mb-8">
                        <input type="number" name="price" value={price} placeholder="Цена товара" onChange={handleChangePrice} className="form-control" />
                    </div>
                    <div className="form-group mb-8">
                        <input type="number" name="quantity" value={quantity} placeholder="Количество товара" onChange={handleChangeQuantity} className="form-control" />
                    </div>
                    <div className="form-group mb-8">
                        <input type="text" name="description" value={description} placeholder="Описание товара" onChange={handleChangeDescription} className="form-control" />
                    </div>
                    <h4>Изготовитель:</h4>
                    <div className="form-group mb-8">
                        <input type="text" name="name_brand" value={name_brand} placeholder="Наименование изготовителя" onChange={handleChangename_brand} className="form-control" />
                    </div>
                    <div className="form-group mb-8">
                        <input type="text" name="description_brand" value={description_brand} placeholder="Описание изготовителя" onChange={handleChangeDescription_brand} className="form-control" />
                    </div>
                    <select value={value} onChange={handleChangeSelect}>
                    {categories.map((category, index) => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                    </select >
                    <div className="form-group mb-8">
                        <input type="text" name="country_brand" value={country_brand} placeholder="Страна изготовителя" onChange={handleChangeCountry} className="form-control" />
                    </div>
                    <div className="row g-2 mt-1">
                    <button className="btn btn-outline-primary" type="button" onClick={handleCreation}>
                        Добавить
                    </button>
                    </div>
                </form>
            </div>
        )
    
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(AddProduct);