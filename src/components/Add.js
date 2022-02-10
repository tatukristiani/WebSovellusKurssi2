import React, {useContext, useEffect, useState} from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {UserContext} from "./UserContext";
import {SessionContext} from "./SessionContext";



/* 1st form.
const Add = ({onSubmit, inputValue, onChange}) => {
    return(
        <div className="container">
           <div>
               <form onSubmit={onSubmit}>
                   <input value={inputValue} onChange={onChange} />
                   <button type="submit">Save Node</button>
               </form>
           </div>
        </div>
    )
}
*/

// Validated form
const Add = () => {
    const {savedUser, setSavedUser} = useContext(UserContext)
    const {savedToken, setSavedToken} = useContext(SessionContext)
    const [validated, setValidated] = useState(false) // State of validation, meaning that has the form been validated.
    const [newNode, setNewNode] = useState('') // State of the new node to be made

    // Keeps track of the inputs value.
    const handleNodeChange = (event) => {
        console.log(event.target.value)
        setNewNode(event.target.value)
    }


    const handleSubmitValidation = (event) => {
        event.preventDefault()
        const form = event.currentTarget

        // If there are any invalid fields, won't send the form.
        // On a valid form creates a new Node object with the newNode's state and sends it via POST to json-server
        if(form.checkValidity() === false) {
            event.stopPropagation()
        } else {
            const tokenString = localStorage.getItem("myToken");
            if(tokenString == null) {
                alert("You aren't logged in & your token is invalid!")
            } else {
                const tokenObj = JSON.parse(tokenString);
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer: '  + tokenObj.accessToken
                }

                const nodeObject = {
                    content: newNode
                }

                axios.post('https://moviesoftwareapi.herokuapp.com/api/event', nodeObject, { headers: headers})
                    .then(r => {
                        console.log(JSON.stringify(r));
                        axios.post('http://localhost:3001/nodes', nodeObject)
                            .then()
                            .catch(err => {
                            console.log(err.message);
                        })
                    })
                    .catch(err => {
                    console.log(err.message);
                })
                alert("Content successfully created!")
            }
        }
        setValidated(true)
    }

    return(
        <div className='container'>
            {savedUser ? ( <p> "You are logged in!" </p> ) : (<p> "You must be logged in!" </p>)}
            {savedToken ? ( <p> "Token is saved" </p> ) : (<p> "Token is not saved!" </p>)}
            <Form noValidate validated={validated} onSubmit={handleSubmitValidation}>
                <Form.Group className='mb-3' controlId='formContent'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control autoFocus type='text' placeholder='Enter content' onChange={handleNodeChange} hasValidation required/>
                    <Form.Control.Feedback type='invalid'>Please insert content.</Form.Control.Feedback>
                </Form.Group>
                <Button variant='primary' type='submit'>Add</Button>
            </Form>
        </div>
    )
}


export default Add