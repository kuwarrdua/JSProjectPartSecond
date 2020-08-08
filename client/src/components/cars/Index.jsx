import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

const [cars, setCars] = useState([]);

  useEffect(() => {
    (async () => {
      await getCars();
    })();
  }, []);

  const getCars = async () => {
    const carsResp = await Axios.get('/api/cars');
    if (carsResp.status === 200) setCars(carsResp.data);
  };

  const deleteCar = async car => {
    try {
      const resp = await Axios.post('/api/cars/delete', {
        id: car._id
      });

      if (resp.status === 200) toast("The car profile was deleted successfully",
      {type: toast.TYPE.SUCCESS});

      await getCars();
    } catch (error) {
      toast("There was an error deleting the car profile", {type: toast.TYPE.ERROR});
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>Archive</h1>
      </header>

      <hr/>

      <div className="content">
        {cars && cars.map((car, i) => (
          console.log(cars)
          // <div key={i} className="card my-3">
          //   <div className="card-header clearfix">
          //     <div className="float-left">
          //       <h5 className="card-title">
          //         {car.title}
          //       </h5>
          //       {car.user ? (
          //         <small>~{car.user.fullname}</small>
          //       ) : null}
          //     </div>
                  
          //     <div className="float-right">
          //       <small>{car.updatedAt}</small>
          //     </div>
          //   </div>

          //   <div className="card-body">
          //     <p className="card-text">
          //     I want to sell <strong>{car.carMake} { car.model }, { car.year }</strong> manufactured. It is <strong>{ car.warranty }</strong> vehicle.
          //     </p>
          //   </div>

          //   {user ? (
          //     <div className="card-footer">
          //       <Link to={{
          //         pathname: "/cars/edit",
          //         state: {
          //           id: car._id
          //         }
          //       }}>
          //         <i className="fa fa-edit"></i>
          //       </Link>

          //       <button type="button" onClick={() => deleteCar(car)}>
          //         <i className="fa fa-trash" id="btn"></i>
          //       </button>
          //     </div>
          //   ) : null}
          // </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;