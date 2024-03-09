import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";

import http from '../../http-common';

function Category(props) {

    const CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    
    const { id } = useParams();

    const [category, setCategory] = useState({
        id: id,
        name: ""
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        http.get(`/category/${id}`)
          .then(response => {
            setCategory(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [id]);


    function handleChangeName(ev){
        setCategory({
            ...category,
            name: ev.target.value
        });
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        var data = {
            id: category.id,
            name: category.name
        };
       
    }


    return (
        CurrentUser ? (
                <div className="col-sm-8">
                    <div>
                        <h2>{category.name}</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" name="name" value={category.name} placeholder="Наименование категории" onChange={handleChangeName} className="form-control" />
                        </div>
                        <div className="row g-2 mt-1">
                            <div className="col-auto">
                                <input type="submit" value="Обновить" className="btn btn-primary" />
                            </div>
                            {/* <div className="col-auto">
                                <button type="button" className="btn btn-primary" onClick={deleteCategory}>Удалить</button>
                            </div> */}
                        </div>
                    </form>
                </div>
            
        ) : (
            <div className="col-sm-8">
                <div>
                    <h2>Наименование категории - {category.name}</h2>
                </div>
            </div>
        )
    )

}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Category);