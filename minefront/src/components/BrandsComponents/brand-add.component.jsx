import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import http from '../../http-common';
import { connect } from "react-redux";



function AddBrand(){
    const [brand, setBrand] = useState({
        id: "",
        name: "",
        country: "",
        description: ""
    });
    const navigate = useNavigate();
    
    const CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    function handleCreation(e) {
        e.preventDefault();
        const brandData = {
            name: name,
            country: country,
            description: description
        }
        http.post(`/create/brand`, brandData, { 'Content-Type': 'application/json' })
        .then(response3 => {
          console.log(response3.data);
          navigate('/brands');
          window.location.reload() // Redirect to the home page after successful creation
        })
        .catch(e => {
          console.log(e);
        });
    
    }
    const [name, setname] = useState("");
    const [country, setcountry] = useState("");
    const [description, setdescription] = useState("");

    function handleChangeName(ev){
        setname(ev.target.value)
    }

    function handleChangeCountry(ev){
        setcountry(ev.target.value)
    }

    function handleChangeDescription(ev){
        setdescription(ev.target.value)
    }
    

    return(

            <div className='col-sm-10'>


                <form onSubmit={handleCreation}>
                    <div className="form-group mb-8">
                        <input type="text" name="country" value={country} placeholder="Наименование бренда" onChange={handleChangeCountry} className="form-control" />
                    </div>
                    <div className="form-group mb-8">
                        <input type="text" name="name" value={name} placeholder="Страна бренда" onChange={handleChangeName} className="form-control" />
                    </div>
                    <div className="form-group mb-8">
                        <input type="text" name="description" value={description} placeholder="Описание бренда" onChange={handleChangeDescription} className="form-control" />
                    </div>
                    <div className="row g-2 mt-1">
                    <button className="btn btn-outline-primary" type="button" onClick={handleCreation}>
                        Добавить
                    </button>
                    </div>
                </form>
            </div>
        )
    
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(AddBrand);