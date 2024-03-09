import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header.component';

import Product from './components/ProductsComponents/product.component';
import AddProduct from './components/ProductsComponents/addProduct';
import ProductList from './components/ProductsComponents/product-list.component';

import Brand from './components/BrandsComponents/brand.component';
import AddBrand from './components/BrandsComponents/brand-add.component';
import BrandList from './components/BrandsComponents/brand-list.component';

import Category from './components/CategoriesComponents/category.component';
import AddCategory from './components/CategoriesComponents/category-add.component';
import CategoryList from './components/CategoriesComponents/category-list.component';
import Order from './components/Order';
import Login from "./components/Login";
import Registration from "./components/Registration";
import AdminOrders from './components/adminOrders';
import Profile from "./components/profile.component";
import { connect } from "react-redux";
import OrderProduct from './components/order_product';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div>
                <Router>
                    <Header />
                    {/* <ProductList/> */}
                    <div className="container">
                        <Routes>
                        <Route path="/" element={<ProductList/>}/>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/admin_orders" element={<AdminOrders/>}/>
                        <Route path="/order_product/:id" element={<OrderProduct/>}/>
                        <Route path="/register" element={<Registration/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/product/:id" element={<Product/>} />
                        {/* <Route path="/products" element={<ProductList/>} /> */}
                        <Route path="/brand/:id" element={<Brand/>} />
                        <Route path="/brands" element={<BrandList/>} />
                        <Route path="/category/:id" element={<Category/>} />
                        <Route path="/categories" element={<CategoryList/>} />
                        <Route path="/order" element={<Order/>} />
                        <Route path="/addProduct" element={<AddProduct />} />
                        

                        { this.props.user && (
                            <React.Fragment>
                                <Route path="/register" element={<Registration/>} />
                                <Route path="/profile" element={<Profile/>} />
                                
                                <Route path="/brands/addBrand" element={<AddBrand />} />
                                <Route path="/categories/addCategory" element={<AddCategory />} />
                            </React.Fragment>
                            )}
                            </Routes>
                        </div>
                    </Router>
                </div>
            );
        }
    }

// функциональность Redux: позволяет передать на перенаправляемые страницы данные
function mapStateToProps(state) {
    const { user } = state.auth;
    
    return {
        user
    };
}

// передача данных к другим компонентам
export default connect(mapStateToProps)(App);
