import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
    return(
        <Container className='my-5'>
            <header className="jumbotron">
                <h1>All About Kuwar</h1>
            </header>
            <div>
                <p>
                    The autobiograpgy of Kuwar Dua.
                </p>
            </div>
        </Container>
    );
}

export default About;