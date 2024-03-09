import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import http from '../../http-common';
import categoryAddComponent from './category-add.component';
import CategoryAddComponent from './category-add.component';
import { padding } from '@mui/system';

class CategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            searchName: ""
        };
    }

    componentDidMount(){

        http
        .get("/categories")
        .then(response => {
        // обновление состояния
        this.setState({ categories: response.data });
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



    onChangeSearchName(category) {
        this.setState({
            searchName: category.target.value
        })
    }

    render(){
        const {
            categories,
            searchName
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Список категорий</h4>
                    {categories.map((category, index) => (
                        <li>

                            <ul>
                                <Link to={`/category/${category.id}`}>
                                <div style={{ textAlign: "left" }}>
                                <strong>Категория {category.name}</strong>
                                </div>
                                </Link>

                            </ul>
                        </li>
                    ))}
                    <div className='col-sm-6'>

                        
                        <CategoryAddComponent />

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

export default connect(mapStateToProps)(CategoryList);