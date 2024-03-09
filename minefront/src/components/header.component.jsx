import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo6.jpg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import auth from "../actions/auth";
import http from '../http-common';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from "react-redux";
import { Image } from 'react-bootstrap';
class Header extends React.Component {

    state = {
        CurrentUser : JSON.parse(localStorage.getItem('CurrentUser')),
        show:false,
        cart_products:[],
        final_price:0,
        verified:false
    }
    handleClose = () => {
        this.setState({ show: false });
        window.location.reload(false);
    };

    handleShow = () => {
        this.setState({ show: true });
        http
                        .get(`/cart_products`)
                        .then(response7 => {
                        // обновление состояния
                        this.setState({ cart_products: response7.data });
                        var result = response7.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                            console.log(result);
                            this.setState({final_price: result});
                        this.forceUpdate()   
                        })
                        .catch(e => {
                        console.log(e);
                        });
        this.forceUpdate(); }
    ReduceQuantity = (id) =>{
        
        http
        .get(`/cart_product/${id}`)
        .then((response) => {
          // console.log(response.data);
          if (response.data.quantity <= 1){
            http
                .delete(`/delete/cart_product/${id}`)
                .then(() => {
                    console.log("deleted!");
                    http
                        .get(`/cart_products`)
                        .then(response7 => {
                        // обновление состояния
                        this.setState({ cart_products: response7.data });
                        this.forceUpdate()
                        var result = response7.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                            console.log(result);
                            this.setState({final_price: result});
                        })
                        .catch(e => {
                        console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Error updating movie:', error);
                });
          }
          else{
          var data = {...response.data, "quantity":response.data.quantity-1}
                http
                .post(`/update/cart_product/${id}`, data)
                .then((response2) => {
                    console.log(response2.data);
                    http
                        .get(`/cart_products`)
                        .then(response7 => {
                        // обновление состояния
                        this.setState({ cart_products: response7.data });
                        var result = response7.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                        console.log(result);
                        this.setState({final_price: result});
                        })
                        .catch(e => {
                        console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Error updating movie:', error);
                });
            }
        })
        .catch((error) => {
          console.error('Error updating movie:', error);
        });

        
        
    }
    IncreaseQuantity = (id) =>{
        
        http
        .get(`/cart_product/${id}`)
        .then((response) => {
          // console.log(response.data);

          var data = {...response.data, "quantity":response.data.quantity+1}
                http
                .post(`/update/cart_product/${id}`, data)
                .then((response2) => {
                    console.log(response2.data);
                    http
                        .get(`/cart_products`)
                        .then(response7 => {
                        // обновление состояния
                        this.setState({ cart_products: response7.data });
                            var result = response7.data.map(a => a.product.price * a.quantity).reduce((a, b) => a + b, 0);
                            console.log(result);
                            this.setState({final_price: result});
                        })
                        .catch(e => {
                        console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Error updating movie:', error);
                });
            
        })
        .catch((error) => {
          console.error('Error updating movie:', error);
        });
        
    }

    logOut = () => {
        console.log('User logged out');
        localStorage.removeItem("CurrentUser");
      };
      componentDidMount(){
        if (this.state.CurrentUser){
            http
            .get(`/customer_by_user/${this.state.CurrentUser.id}`)
            .then(response8 => {
              console.log(response8.data);
                // обновление состояния
                if (response8.data.length != 0) {
                    this.setState({ verified: true });
                    // this.setState({ customer: response.data });
                }
                else {
                    this.setState({ verified: false });


                }
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
    }
    constructor(props) {
        super(props);
      }

      

      


    render() {
        const { CurrentUser, show, cart_products, final_price, verified} = this.state;
        
        
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" ><img src={logo} alt="logo" /></Link>
                            </li>
                            {/* <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className="nav-link" to="/products" style={{ fontWeight: 'bold', color: 'black' }}>Товары</Link>
                            </li> */}
                            {/* <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className="nav-link" to="/brands" style={{ fontWeight: 'bold', color: 'black' }}>Бренды асиков</Link>
                            </li> */}
                            {/* <li className="nav-item d-flex align-items-center justify-content-center">
                                <Link className="nav-link" to="/categories" style={{ fontWeight: 'bold', color: 'black' }}>Каталог</Link>
                            </li> */}
                            <li>
                                <Image src='cart.png'onClick={this.handleShow} width="50" style={{paddingTop:"75%"}}></Image>

                                {/* <Button variant="primary" >
                                    Launch demo modal
                                </Button> */}

                                <Modal show={show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title style={{textAlign:'center'}}>Корзина</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {cart_products.length > 0?
                                    <ListGroup as="ol" numbered>
                                    {cart_products.map((cart_product, index) => (
                                        
                                        <ListGroup.Item
                                          as="li"
                                          className="d-flex justify-content-between align-items-start"
                                        >
                                          <div className="ms-2 me-auto">
                                            <div className="fw-bold">{cart_product.product.name} | {cart_product.product.price}*{cart_product.quantity}={cart_product.product.price * cart_product.quantity} руб</div>
                                            <div><Button onClick={()=>this.ReduceQuantity(cart_product.id)}>-</Button><Button onClick={()=>this.IncreaseQuantity(cart_product.id)}>+</Button></div>
                                           
                                           
                                          </div>
                                          <Badge bg="primary" pill>
                                            {cart_product.quantity} шт.
                                          </Badge>
                                        </ListGroup.Item>
                                    ))}
                                        </ListGroup>
                                        :<div>Пусто</div>
                                        }
                                        </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Закрыть
                                    </Button>
                                    {verified?
                                    <Button variant="primary" onClick={this.handleClose}>
                                    <Link to="/order" className="btn btn-primary">Оформить заказ</Link>
                                </Button>
                                    :<div>Дозаполните профиль для оформления заказа</div>
                                    }
                                    
                                    <div>Итого товара на сумму: {final_price} руб</div>
                                    </Modal.Footer>
                                </Modal>
      </li>
                            {CurrentUser ? (
                                <React.Fragment>
                                <li className="nav-item d-flex align-items-center justify-content-center">
                                    <Link to={"/profile"} className="nav-link" style={{ fontWeight: 'bold', color: 'black' }}>
                                        Профиль
                                    </Link>
                                </li>
                                <li className="nav-item d-flex align-items-center justify-content-center">
                                    <a href="/login" className="nav-link" onClick={this.logOut} style={{ fontWeight: 'bold', color: 'black' }}>
                                        Выйти
                                    </a>
                                </li>
                            </React.Fragment>
                                
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item d-flex align-items-center justify-content-center">
                                        <Link to={"/login"} className="nav-link" style={{ fontWeight: 'bold', color: 'black' }}>
                                            Войти
                                        </Link>
                                    </li>
                                    <li className="nav-item d-flex align-items-center justify-content-center">
                                        <Link to={"/register"} className="nav-link" style={{ fontWeight: 'bold', color: 'black' }}>
                                            Зарегистрировать пользователя
                                        </Link>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Header);