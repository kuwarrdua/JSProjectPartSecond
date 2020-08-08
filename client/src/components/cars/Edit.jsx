import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    carMake: '',
    year: '',
    warranty: 'IN WARRANTY',
    model: ''
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const carResp = await Axios.get(`/api/cars/${id}`);
      if (carResp.status === 200) setInputs(carResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/cars/update', inputs);

      if (resp.status === 200)  {
        toast("The car profile was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the car profile", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the car profile", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/cars"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit your car profile</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Car Make:</Form.Label>
            <Form.Control
              name="carMake"
              onChange={handleInputChange}
              value={inputs.carMake}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Year:</Form.Label>
            <Form.Control
              name="year"
              onChange={handleInputChange}
              value={inputs.year}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Warranty:</Form.Label>
            <Form.Control
              as="select"
              name="warranty"
              onChange={handleInputChange}
              defaultValue={inputs.warranty || 'NOT IN WARRANTY'}
            >
              <option value="IN WARRANTY">Waranteed</option>
              <option value="NOT IN WARRANTY">Not Waranteed</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Model:</Form.Label>
            <Form.Control
              name="model"
              onChange={handleInputChange}
              value={inputs.model}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;