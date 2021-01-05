import React, { Component } from 'react';
import '../App.css';
// import { Container } from 'reactstrap';
import { Grid, Container} from '@material-ui/core';
import image1 from "../images/image 15.png";
import image2 from "../images/image 16.png";
import "./HomeComponent.css"


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
                <div className='Home'>
                    <Container>

                        <div className="col1" >
                            <img className="img1" src={image1} alt="image1" />
                        </div>
                        <div className="col2">
                            <Grid container justify="center" alignContent="center" direction="column">
                            <img className="img2" src={image2} alt="image1" />
                            <p className="text1"> You can SELL and BUY digital art work here. 
                            <br/>
                            The art work can be used in yuor Superworld</p>
                            </Grid>
                            
                            <button className="start-btn">
                                Start
                            </button>

                            
                        </div>
                   
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </Container>


                </div>
                <br/>
                <br/><br/><br/><br/><br/><br/><br/><br/>
            </>
        );
    }
}

export default Home;
