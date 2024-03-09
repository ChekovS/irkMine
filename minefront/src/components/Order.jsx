import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import http from '../http-common';
import { redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
class Order extends React.Component {
    

    state = {
        CurrentUser: JSON.parse(localStorage.getItem('CurrentUser')),
        verified: false,
        firstName: "",
        lastName: "",
        email: "",
        customer: {},
        cart:{},
        cart_products:[],
        final_price:0
    }

    submitOrder=(event)=>{
        
        var data={
            date: new Date(),
            customer:this.state.customer
        }
        http
                .post(`/create/order`, data)
                .then((response) => {
                    console.log(response.data)
                    this.state.cart_products.forEach(element => {
                        var data2={
                            order:response.data,
                            product:element.product,
                            quantity:element.quantity
                        }
                        http
                            .post(`/create/order_product`, data2)
                            .then((response2) => {
                                console.log(response2.data)
                                http
                            .delete(`/delete/cart_product/${element.id}`)
                            .then(() => {

                                
                                
                            })
                            .catch((error) => {
                                console.error('Error updating movie:', error);
                            });
                                
                            })
                            .catch((error) => {
                                console.error('Error updating movie:', error);
                            });
                        
                    });
                    
                })
                .catch((error) => {
                    console.error('Error updating movie:', error);
                });
                this.forceUpdate();
                http
                .get(`/customer_by_user/${this.state.CurrentUser.id}`)
                .then(response2 => {
                // обновление состояния
                    this.setState({ customer: response2.data});
                })
                .catch(e => {
                console.log(e);
                });
        http
        .get(`/cart_for_user/${this.state.CurrentUser.id}`)
        .then(response => {
        // обновление состояния
        this.setState({ cart: response.data });
                http
                .get(`/cart_product_by_cart/${response.data.id}`)
                .then(response2 => {
                // обновление состояния
                    
                    this.setState({ cart_products: response2.data});
                    var result = response2.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                    console.log(result);
                    this.setState({final_price: result});
                    window.location.reload(false);
                })
                .catch(e => {
                console.log(e);
                });
        })
        .catch(e => {
        console.log(e);
        });
                


                
        
        
    }
    handleVerify(e){
        e.preventDefault();
        var data={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email: this.state.email,
            user:this.state.CurrentUser
        };
        return http.post(`/create/customer`, data, { 'Content-Type': 'application/json' }).then(response2=>{
            var data = {
              "customer":response2.data,
              "date":new Date()
            };
            http.post(`/create/order`, data, { 'Content-Type': 'application/json' }).then(response3=>{
              console.log(response3);
              window.location.reload(false);
            })
          });

    }
    componentDidMount() {
        http
                .get(`/customer_by_user/${this.state.CurrentUser.id}`)
                .then(response2 => {
                // обновление состояния
                    this.setState({ customer: response2.data});
                })
                .catch(e => {
                console.log(e);
                });
        http
        .get(`/cart_for_user/${this.state.CurrentUser.id}`)
        .then(response => {
        // обновление состояния
        this.setState({ cart: response.data });
                http
                .get(`/cart_product_by_cart/${response.data.id}`)
                .then(response2 => {
                // обновление состояния
                    
                    this.setState({ cart_products: response2.data});
                    var result = response2.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                    console.log(result);
                    this.setState({final_price: result});
                })
                .catch(e => {
                console.log(e);
                });
        })
        .catch(e => {
        console.log(e);
        });
    }
    render() {
        const { CurrentUser, cart_products, final_price, customer} = this.state;

        return (
            <div>
                <h4>Заказ {new Date().toLocaleDateString()}</h4>
                <ul>
                    
                {cart_products.map((cart_product, index) => (
                    <li>
                        <div>Наименование: {cart_product.product.name}</div>
                        <div>В количестве: {cart_product.quantity} шт</div>
                        <div>Сумма за ед: {cart_product.product.price} руб</div>
                        <div>Категория товара: {cart_product.product.category.name}</div>
                    </li>
                ))}
                </ul>
                <div>Покупатель: {customer.firstName} {customer.lastName}</div>
                <strong style={{paddingLeft:"15%"}}>ИТОГО: {final_price} руб</strong>
                <div style={{paddingLeft:"15%"}}>
                <Button onClick={this.submitOrder}>Провести</Button>
                </div>
            </div>
            
            
        

        );
    }


}


export default Order;