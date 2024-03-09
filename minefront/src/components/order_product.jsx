import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Route, Routes, useParams} from 'react-router-dom';
import http from '../http-common';
import { padding } from '@mui/system';
import { match } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function OrderProduct(props){
    const[orders_products, setOrdersProducts] = useState([]);
    const[order, setOrder] = useState({});
    const navigate = useNavigate();
    const orderadminnavigateAccept = () => {
        alert("Заказ принят!")
        navigate('/admin_orders', {replace: true});
      };
      const orderadminnavigateDecline = () => {
        alert("Отказ")
        navigate('/admin_orders', {replace: true});
      };
    const[final_price, setFinalPrice] = useState(0);
    const { id } = useParams();
    console.log(id);
    const AcceptOrder = async () => {
        try {
            for (let element of orders_products) {
                await http.delete('/delete/order_product/' + element.id);
            }
            await http.delete('/delete/order/' + order.id);
            orderadminnavigateAccept();
        } catch (e) {
            console.log(e);
        }
    };
    
    const DeclineOrder = async () => {
        try {
            for (let element of orders_products) {
                await http.delete('/delete/order_product/' + element.id);
            }
            await http.delete('/delete/order/' + order.id);
            orderadminnavigateDecline();
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await http.get(`/order/${id}`);
                setOrder(orderResponse.data);
                const orderProductsResponse = await http.get(`/order_products_by_order/${id}`);
                setOrdersProducts(orderProductsResponse.data);
                var result = orderProductsResponse.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                setFinalPrice(result);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [id]);



        return (
            <div className="list row">
                <div className="col-md-6">
                {order.customer?
                     <h4>Заказ от клиента {order.customer.firstName} {order.customer.lastName}</h4>
                     :<h4></h4>
                    }
                <div>Выполнен {new Date(order.date).toLocaleDateString()}</div> 
                <table class="table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Наименование</th>
                    <th>Категория</th>
                    <th>Количество, шт</th>
                    <th>Цена за шт Руб</th>
                    <th>Итого, Руб</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {orders_products.map((order_product, index) => (
                        <tr>
                            <th>{index+1}</th>
                            <th>
                                {order_product.product.name}
                            </th>
                            <th>
                                {order_product.product.category.name}
                            </th>
                            <th>
                                {order_product.quantity}
                            </th>
                            <th>
                                {order_product.product.price}
                            </th>
                            <th>
                                {order_product.product.price * order_product.quantity}
                            </th>
                        </tr>
                    ))}
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Итого:{final_price} Руб</th>
                    </tr>
                    </tbody>
                    </table>
                        <Button onClick={()=>AcceptOrder()}>Принять</Button>
                        <Button onClick={()=>DeclineOrder()}>Отказать</Button>
                </div>

            </div>

        );
    
                    }
                


// function mapStateToProps(state) {
//     const { user } = state.auth;
//     return {
//         user
//     };
// }

export default OrderProduct;