import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import http from '../../http-common';
import { connect } from "react-redux";



function AddCategory(){
    const [category, setCategory] = useState({
        id: "",
        name: ""
    });
    const navigate = useNavigate();
    
    const CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    function handleCreation(e) {
        e.preventDefault();
        const categoryData = {
            name: name
        }
        http.post(`/create/category`, categoryData, { 'Content-Type': 'application/json' })
        .then(response3 => {
          console.log(response3.data);
          navigate('/categories');
          window.location.reload() // Redirect to the home page after successful creation
        })
        .catch(e => {
          console.log(e);
        });
    
    }
    const [name, setname] = useState("");

    function handleChangeName(ev){
        setname(ev.target.value)
    }
    

    return(

            <div className='col-sm-10'>


                <form onSubmit={handleCreation}>
                    <div className="form-group mb-8">
                        <input type="text" name="name" value={name} placeholder="Наименование категории" onChange={handleChangeName} className="form-control" />
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

export default connect(mapStateToProps)(AddCategory);