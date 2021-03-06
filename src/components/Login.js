import React, {useContext, useState} from "react";
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import {UserContext} from "./UserContext";
import {SessionContext} from "./SessionContext";


const Login = () => {
    const {savedUser, setSavedUser} = useContext(UserContext);
    const {savedToken, setSavedToken} = useContext(SessionContext);

    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState({username: '', password: ''})
    let tokenKey = "myToken"


    const handlePasswordChange = (event) => {
        setUser({...user, password: event.target.value})
    }
    const handleUsernameChange = (event) => {
        setUser({...user, username: event.target.value})
    }

    const handleLogin = async (event) => {
        const account = {
            username: user.username,
            password: user.password
        }
        event.preventDefault()
        const form = event.currentTarget

        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            axios.post('https://moviesoftwareapi.herokuapp.com/accountValidate', account)
                .then(response => {
                    console.log(response)
                    if(response.data === false) {
                        alert("Invalid credentials!")
                    } else {
                        localStorage.setItem("user", account.username)
                        localStorage.setItem(tokenKey,JSON.stringify(response.data))
                        setSavedUser(localStorage.getItem("user"))
                        setSavedToken(localStorage.getItem("myKey"))
                        alert("Valid credentials!")
                    }
                })
        }
        setValidated(true)
    }

    return(
        <div className="container">
            <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={handleUsernameChange} required/>
                    <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required />
                    <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login