import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import http from '../http-common';
import { padding } from '@mui/system';

class adminOrders extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            searchName: ""
        };
    }

    componentDidMount(){

        http
        .get("/orders")
        .then(response => {
        // обновление состояния
        this.setState({ orders: response.data });
        })
        .catch(e => {
        console.log(e);
        });
    }

    // getRequestParams(searchName){
    //     let params = {};

    //     params["name"] = searchName;
        
    //     return params;
    // }



    // onChangeSearchName(brand) {
    //     this.setState({
    //         searchName: brand.target.value
    //     })
    // }

    render(){
        const {
            orders
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                <table class="table">
                <thead>
                    <tr>
                    <h4>Поступаемые заказы</h4>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr>
                            <th>
                                {order.customer.firstName} {order.customer.lastName}
                                <div>{new Date(order.date).toLocaleDateString()}</div>
                            </th>
                            <th>
                                <Link to={{pathname:`/order_product/${order.id}`, query:{ id: order.id}}}>
                                    Состав заказа
                                </Link>

                            </th>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                    <div className='col-sm-6'>
                            {/* <div className="g-1 mt-0">
                            <button className="btn btn-outline-primary" type="button" onClick={this.onChangeSearchName} >
                                Найти
                            </button>
                            </div> */}
                        
                        {/* <BrandAddComponent /> */}
                        {/* <div className="form-group mb-3">
                            <input type="text" className="name" placeholder="Имя" value={searchName} onChange={this.onChangeSearchName} />
                        </div> */}

                                        {/* <button className="btn btn-outline-primary" type="button" onClick={AddCate}>
                                            Добавить
                                        </button> */}
                            {/* { this.props.user && (
                                // <React.Fragment>
                                //     &nbsp;
                                //     &nbsp;
                                //     <Link to={"/categories/addCategory"} style={{ color: 'blue', textDecoration: 'none' }}>
                                //         <button className="btn btn-outline-primary" type="button">
                                //             Добавить
                                //         </button>
                                //     </Link>
                                // </React.Fragment>
                            )} */}
                        {/* </div> */}
                    </div>

                </div>
            </div>

        );
    }
}

// function mapStateToProps(state) {
//     const { user } = state.auth;
//     return {
//         user
//     };
// }

export default adminOrders;