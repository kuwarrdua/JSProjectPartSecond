import React from 'react';
//update data when usre updates information to kinda store information
import { useState } from 'react';
//send request to server using Axios
import Axios from 'axios';
import { Form, Container} from 'react-bootstrap';
import {Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setUser}) => {
    const [ inputs, setInputs ] = useState({
        email: '',
        password: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
    
        try{
    //address and data
    const resp = await Axios.post('/api/authenticate', inputs);
    console.log(resp);

    if(resp.status === 200){
        setUser(resp.data.user);
        toast('You have logged in successfully', {
            type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
    } else{
        toast("There was an issue logging you in. Please check your credentials.",{
        type: toast.TYPE.ERROR
    });
    }
} catch (error){
    toast("There was an issue logging you in. Please check your credentials.",{
        type: toast.TYPE.ERROR
    });
}
    };
    const handleInputChange = event => {
        event.persist();
        const { name, value } = event.target;
        //to dynamically set the property that why we used []
        setInputs(inputs => ({...inputs, [name]: value}))
        console.log(inputs);
    };

    if(redirect) return <Redirect to="/cars/" />
    return(
        <Container className="container my-5">
            <header>
                <h1>Login</h1>
            </header>
            <hr/>

            <Form onSubmit={ handleSubmit }>
                    <Form.Group>
                        <label htmlFor="email">Email:</label> 
                        <Form.Control className="form-control" type="email" name="email" onChange={ handleInputChange } value={ inputs.email } />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="password">Password:</label> 
                        <Form.Control className="form-control" type="password" name="password" onChange = { handleInputChange } value = { inputs.password }/>
                    </Form.Group>
                    <Form.Group>
                        <button className="btn btn-primary">Login
                        </button>
                    </Form.Group>
            </Form> 
        </Container>
    )
};

export default Login;