import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";

import http from '../../http-common';

function Product(props) {

    const { id } = useParams();

    const [product, setProduct] = useState({
        id: id,
        name: "",
        price: "",
        quantity: "",
        description: ""
    });

    useEffect(() => {
        http.get(`/product/${id}`)
          .then(response => {
            setProduct(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [id]);



    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

    }, []);


    function handleChangeName(ev){
        setProduct({
            ...product,
            name: ev.target.value
        });
    }

    function handleChangePrice(ev){
        setProduct({
            ...product,
            price: ev.target.value
        });
    }

    function handleChangeQuantity(ev){
        setProduct({
            ...product,
            quantity: ev.target.value
        });
    }

    function handleChangeDescription(ev){
        setProduct({
            ...product,
            description: ev.target.value
        });
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        var data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description
        };
       
    }


    return (
            <div>{product.name?
                <div>
                <div><strong>{product.name}</strong></div>
                <div>Описание {product.description}</div>
                <div>Производитель {product.brand.name}</div>
                <div>Категория товара: {product.category.name}</div>
                <div>Сделано в стране {product.brand.country}</div>
                <div>Цена {product.price}</div>
                <div>На складе осталось {product.quantity} шт</div>                
                </div>
                :<div></div>
                }
            </div>
 
        // props.user ? (
        //     !submitted ? (
        //         <div className="col-sm-8">
                    




        //             <form onSubmit={handleSubmit}>
        //                 <div className="form-group mb-3">
        //                     <input type="text" name="name" value={product.name} placeholder="Наименование товара" onChange={handleChangeName} className="form-control" />
        //                 </div>
        //                 <div className="form-group mb-3">
        //                     <input type="integer" name="price" value={product.price} placeholder="Цена товара" onChange={handleChangePrice} className="form-control" />
        //                 </div>
        //                 <div className="form-group mb-3">
        //                     <input type="integer" name="quantity" value={product.quantity} placeholder="Количество товара" onChange={handleChangeQuantity} className="form-control" />
        //                 </div>
        //                 <div className="form-group mb-3">
        //                     <input type="text" name="description" value={product.description} placeholder="Описание товара" onChange={handleChangeDescription} className="form-control" />
        //                 </div>
        //                 <div className="row g-2 mt-1">
        //                     <div className="col-auto">
        //                         <input type="submit" value="Обновить" className="btn btn-primary" />
        //                     </div>
        //                     {/* <div className="col-auto">
        //                         <button type="button" className="btn btn-primary" onClick={deleteCategory}>Удалить</button>
        //                     </div> */}
        //                 </div>
        //             </form>
        //         </div>
        //     ) : <Navigate to="/product" />
        // ) : (
        //     <div className="col-sm-8">
        //         <div>
        //             <h2>Наименование товара - {product.name}</h2>
        //             <h2> Цена товара - {product.price} руб.</h2>
        //             <h2> Количество товара - {product.quantity} штук</h2>
        //             <h2>Описание товара - {product.description}</h2>
        //         </div>
        //     </div>
        // )
    )

}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Product);