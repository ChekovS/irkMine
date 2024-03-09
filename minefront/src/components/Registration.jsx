import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../http-common';
// import { connect } from "react-redux";
// import { register } from "../../actions/auth";
function Register(props){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(undefined);
  function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  const navigate = useNavigate();
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  const homenavigate = () => {
    alert("Вы успешно зарегистрированы!")
    navigate('/', {replace: true});
  };
  function handleRegister(e) {
    e.preventDefault();

    http
      .get(`/findUser/${username}/${password}`)
      .then(response => {
        if (response.data.length === 0) {
          var data = {
            "login": username,
            "password": password,
            "date": new Date(),
            "admin": false
          };
          return http.post(`/create/user`, data, { 'Content-Type': 'application/json' }).then(response2=>{
            var data2 = {
              "user":response2.data
            };
            http.post(`/create/cart`, data2, { 'Content-Type': 'application/json' }).then(response3=>{
              console.log(response3);
              homenavigate();
            })
          });

        } else {
          alert("Такой пользователь уже есть!");
          throw new Error("User already exists");
        }
      })
      .then(response => {
        console.log(response.data);
        
      })
      .catch(error => {
        console.log(error);
      });
  }


return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="col-md-5">
        <form onSubmit={handleRegister}>
          <div className="form-group mt-2">
            <input type="text" className="form-control" name="username" placeholder="Логин" value={username} onChange={onChangeUsername} required/>
          </div>
          <div className="form-group mt-2">
            <input type="password" className="form-control" name="password" placeholder="Пароль" value={password} onChange={onChangePassword} required/>
          </div>
          {/* <div className="form-group mt-2">
            <input type="email" className="form-control" name="email" placeholder="email" value={email} onChange={onChangeEmail} required/>
          </div> */}

          <div className="form-group mt-2">
            <button className="btn btn-primary btn-block">Зарегистрировать</button>
          </div>
        </form>
      </div>
      </div> 
  );
}


export default Register;