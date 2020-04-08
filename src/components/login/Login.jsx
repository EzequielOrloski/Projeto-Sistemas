import React, { Component } from "react";
import { Container, Row, Form, Button } from 'react-bootstrap';
import './login.css';

class Login extends Component{
    render() {
        return(
            <Form>
                <h3>Login</h3>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha"/>
                </Form.Group>
                <Button variant="primary" className="btn btn-block" type="submit">Logar</Button>
            </Form>
        );
    }
}
export default Login;