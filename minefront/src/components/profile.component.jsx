import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import http from '../http-common';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
class Profile extends React.Component {

    state = {
        CurrentUser: JSON.parse(localStorage.getItem('CurrentUser')),
        verified: false,
        firstName: "",
        lastName: "",
        email: "",
        customer: {}
    }
    onChangefirstName = (e)=> {
        this.setState({firstName: e.target.value});
      }
      onChangeemail = (e) => {
        this.setState({email: e.target.value});
      }
    onChangesecondName = (e) =>{
        this.setState({lastName: e.target.value});
      }
      handleVerify = async (e) => {
        e.preventDefault();
        const { CurrentUser, firstName, lastName, email } = this.state;
        var data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          user: CurrentUser
        };
        const response2 = await http.post(`/create/customer`, data, { 'Content-Type': 'application/json' });
        var data_1 = {
          customer: response2.data,
          date: new Date()
        };
        http.post(`/create/order`, data_1, { 'Content-Type': 'application/json' }).then(response3 => {
          console.log(response3);
          window.location.reload(false);
        });
      }
    componentDidMount() {
        http
            .get(`/customer_by_user/${this.state.CurrentUser.id}`)
            .then(response => {
              console.log(response.data);
                // обновление состояния
                if (response.data.length != 0) {
                    this.setState({ verified: true });
                    this.setState({ customer: response.data });
                }
                else {
                    this.setState({ verified: false });
                    
                    

                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const { CurrentUser, verified, customer, firstName, lastName, email } = this.state;

        return (
            
            <div className="container">
              
                {verified?
                <div>
                < header >
                    <h3>
                    <Image src="user.png" width="100" rounded></Image>Профиль <strong>{customer.firstName} {customer.lastName}</strong>
                    </h3>
                </header >
                <p>
                    <strong>email: {customer.email}</strong>

                </p>
                {CurrentUser.admin?
                <div>
                <Link to="/admin_orders"><div><Image src="order.png" width="75" flipped/>Заказы</div></Link>
                <Link to="/addProduct"><div><Image src="videocard.png" width="75" flipped/>Добавить товар</div></Link>
                </div>:
                <div></div>

    }
                </div>
                :
                <div>
                <h4>{CurrentUser.login}! Для совершения заказов дозаполните профиль</h4>
                <Form onSubmit={this.handleVerify}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
            onChange={this.onChangefirstName}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={this.onChangesecondName}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Почта</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={this.onChangeemail}
          />
        </Form.Group>
        
        <Button type="submit" variant="primary">
          Сохранить изменения
        </Button>
      </Form>
                </div>
                
                }
            </div >
        

        );
    }


}

// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user
//   };
// }

export default Profile;