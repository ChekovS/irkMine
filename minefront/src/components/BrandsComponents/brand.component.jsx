import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from "react-redux";

import http from '../../http-common';

function Brand(props) {

    const { id } = useParams();

    const [brand, setBrand] = useState({
        id: id,
        name: "",
        description: "",
        country: ""
    });

    useEffect(() => {
        http.get(`/brand/${id}`)
          .then(response => {
            setBrand(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [id]);



    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

    }, []);


    function handleChangeName(ev){
        setBrand({
            ...brand,
            name: ev.target.value
        });
    }

    function handleChangeCountry(ev){
        setBrand({
            ...brand,
            country: ev.target.value
        });
    }

    function handleChangeDescription(ev){
        setBrand({
            ...brand,
            description: ev.target.value
        });
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        var data = {
            id: brand.id,
            name: brand.name,
            country: brand.country,
            description: brand.description
        };
       
    }


    return (

 
        props.user ? (
            !submitted ? (
                <div className="col-sm-8">
                    




                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" name="name" value={brand.name} placeholder="Наименование бренда" onChange={handleChangeName} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" name="country" value={brand.country} placeholder="Имя бренда" onChange={handleChangeName} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" name="description" value={brand.description} placeholder="Описание бренда" onChange={handleChangeName} className="form-control" />
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
            ) : <Navigate to="/brand" />
        ) : (
            <div className="col-sm-8">
                <div>
                    <h2>Наименование бренда - {brand.name}</h2>
                    <h2>Страна производителя - {brand.country}</h2>
                    <h2>Описание бренда:<br></br> {brand.description}</h2>
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

export default connect(mapStateToProps)(Brand);