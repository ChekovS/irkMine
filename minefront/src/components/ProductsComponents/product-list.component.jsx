import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import http from '../../http-common';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import productAddComponent from './addProduct';
import ProductAddComponent from './addProduct';
import { padding } from '@mui/system';
import Tooltip from 'react-bootstrap/Tooltip';
import Pagination from 'react-bootstrap/Pagination';
import ToolTipContent from './ToolTipContent';
import { Button } from 'react-bootstrap';
class ProductList extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            searchName: "",
            cart_products:[],
            cart:{},
            CurrentUser : JSON.parse(localStorage.getItem('CurrentUser')),
            currentPage: 1,
            itemsPerPage: 6
        };
    }

    async componentDidMount(){
        try {
            const response = await http.get("/products");
            this.setState({ products: response.data });
        } catch (e) {
            console.log(e);
        }
    
        if (this.state.CurrentUser){
            try {
                const response = await http.get(`/cart_for_user/${this.state.CurrentUser.id}`);
                this.setState({ cart: response.data });
    
                const response2 = await http.get(`/cart_product_by_cart/${response.data.id}`);
                let result = response2.data.map(a => a.product.id);
                this.setState({ cart_products: result});
            } catch (e) {
                console.log(e);
            }
        }
    }
    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }
    getRequestParams(searchName){
        let params = {};

        params["name"] = searchName;
        
        return params;
    }

    // const TooltipContent = (props) => (
    //     <Tooltip id="button-tooltip" {...props}>
    //         Simple tooltip
    //     </Tooltip>
    // );


    onChangeSearchName(product) {
        this.setState({
            searchName: product.target.value
        })
    }
    async handleCartAdding(product){
        var data={
            "product": product,
            "cart":this.state.cart,
            "quantity":1
        }
        console.log(data);
        try {
            const response3 = await http.post(`/create/cart_product`, data, { 'Content-Type': 'application/json' });
            console.log(response3);
            this.forceUpdate();
    
            const response2 = await http.get(`/cart_product_by_cart/${this.state.cart.id}`);
            let result = response2.data.map(a => a.product.id);
            this.setState({ cart_products: result});
            console.log(this.state.cart_products);
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        const {
            products,
            searchName,
            cart_products,
            CurrentUser
        } = this.state;
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;
        const productsForCurrentPage = products.slice(startIndex, endIndex);
        const totalPages = Math.ceil(products.length / this.state.itemsPerPage);
        return (
                <div>
                <div className="card-container">
                    {/* <h4>Список товаров</h4> */}
                    {productsForCurrentPage.map((product, index) => (
                        <Card key={index} style={{ width: '18rem' }}>
                            <Card.Body>
                            <Link to={`/product/${product.id}`}><Card.Title>{product.name}</Card.Title></Link>
                                <Card.Text>Описание:
                                    <div style={{fontSize:'14pt'}}>{product.description}</div></Card.Text>
                                {product.brand?
                                <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<ToolTipContent brandId={product.brand.id}/> }
                            >
                                <div>
                                <Card.Text>Производитель:{product.brand.name}</Card.Text>
                                </div>
                            </OverlayTrigger>
                                
                                :<div></div>
                            }
                                <Card.Text style={{textAlign:"center"}}>Цена: {product.price} руб</Card.Text>
                                {product.quantity > 0 ?
                                    <Card.Text style={{textAlign:"end", fontSize:'10pt'}}>В наличии: {product.quantity} шт.</Card.Text>
                                    :
                                    <Card.Text style={{color:"red", textAlign:"end"}}>Нет в наличии</Card.Text>
                                }
                                {/* <Link to={`/product/${product.id}`}>More details</Link> */}
                                {CurrentUser?<div>
                                {cart_products.includes(product.id)?
                                <div style={{color:"green"}}>Добавлено в корзину</div>
                                
                                :<div>{product.quantity > 0 ?<Button onClick={() => this.handleCartAdding(product)}>Добавить в корзину</Button>:<div></div>}</div>
                                }</div>:<div></div>
                            }
                            </Card.Body>
                        </Card>
                    ))}
            
                    {/* <div className='col-sm-6'>
                        <ProductAddComponent />
                    </div> */}
                    </div>
                    <div className="pagination">
                     <Pagination>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === this.state.currentPage - 1}
                        onClick={() => this.handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            </div>
                </div>

                       

        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(ProductList);