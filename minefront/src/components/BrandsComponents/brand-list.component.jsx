import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import http from '../../http-common';
import brandAddComponent from './brand-add.component';
import BrandAddComponent from './brand-add.component';
import { padding } from '@mui/system';

class BrandList extends Component {
    constructor(props){
        super(props);
        this.state = {
            brands: [],
            searchName: ""
        };
    }

    componentDidMount(){

        http
        .get("/brands")
        .then(response => {
        // обновление состояния
        this.setState({ brands: response.data });
        })
        .catch(e => {
        console.log(e);
        });
    }

    getRequestParams(searchName){
        let params = {};

        params["name"] = searchName;
        
        return params;
    }



    onChangeSearchName(brand) {
        this.setState({
            searchName: brand.target.value
        })
    }

    render(){
        const {
            brands,
            searchName
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Список брендов</h4>
                    {brands.map((brand, index) => (
                        <li>

                            <ul>
                                <Link to={`/brand/${brand.id}`}>
                                <div style={{ textAlign: "left" }}>
                                <strong>Наименование бренда - {brand.name}</strong><br></br>
                                <strong>Страна производителя - {brand.name}</strong>
                                </div>
                                </Link>

                            </ul>
                        </li>
                    ))}
                    <div className='col-sm-6'>
                            {/* <div className="g-1 mt-0">
                            <button className="btn btn-outline-primary" type="button" onClick={this.onChangeSearchName} >
                                Найти
                            </button>
                            </div> */}
                        
                        <BrandAddComponent />
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

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(BrandList);