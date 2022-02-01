import React, {useState} from "react";
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from "axios";



const Register = () => {
    const [validated, setValidated] = useState(false)
    const [user, setUser] = useState()


    const handlePasswordChange = (event) => {
        setUser({...user, password: event.target.value})
    }
    const handleUsernameChange = (event) => {
        setUser({...user, username: event.target.value})
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget

        if(form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()

            axios.post('https://moviesoftwareapi.herokuapp.com/createAccount', user)
                .then(response => console.log(response))
                .catch(err => console.log(err.message()))
            console.log(user)
        }
        setValidated(true)

    }

    return(
        <div className="container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register