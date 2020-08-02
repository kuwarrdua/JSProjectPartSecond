import React, { useState, useEffect} from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
const Edit = function (props) {


    const id= props.location.state.id;
    //set states to capture input
    const [inputs, setInputs] = useState({
        title: '',
        content: '',
        status: 'DRAFT'
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        (async () => {
            const blogResp = await Axios.get(`/blogs/${id}`);
            if(blogResp.status === 200) setInputs(blogResp.data);
        })();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        try{
        const resp = await Axios.post('/api/blogs/update', inputs);
        if(resp.status === 200){
            toast ("The blog was updated successfully", {
                type: toast.TYPE.SUCCESS
            });
            setRedirect(true);
        } else{
            toast("There was an issue updating the blog", {
                type: toast.TYPE.ERROR
            });
        }
} catch{
    toast("There was an issue creating the blog", {
        type: toast.TYPE.ERROR
    }); 
}
    }
    const handleInputChange = async event => {
        //so that the event actually gets handled
        event.persist();

        const {name, value} = event.target;

        setInputs(inputs => ({
            ...inputs,
            [name]: value
        }));
    };

    if(redirect) return (<Redirect to="/blogs"/>);

    return(
        <Container className="my-5">
            <header>
                <h1>Edit Blog Post</h1>
            </header>
            <hr />

            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            name="title"
                            onChange={handleInputChange}
                            value={inputs.title}
                            />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="content"
                            onChange={handleInputChange}
                            value={inputs.content}
                            />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>status:</Form.Label>
                        <Form.Control
                        as="select"
                            name="status"
                            onChange={handleInputChange}
                            defaultValue={inputs.status || 'DRAFT'}
                            >
                                <option value="DRAFT">draft</option>
                                <option value="PUBLISHED">published</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    )
};

export default Edit;
