import React, { Component } from 'react';
import '../App.css';
import { Container } from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    render() {
        return (
            <>
                <div className='bg'>
                    <Container>
                        <h2>Welcome to CryptoArt</h2>
                    </Container>
                </div>
            </>
        );
    }
}

export default Home;
