import React, { Component } from 'react';
import '../App.css';
// import { Container } from 'reactstrap';
import { Container, Card, CardBody, CardSubtitle, CardText, CardImg } from 'reactstrap';
import { Grid } from '@material-ui/core';
import image1 from "../images/image 15.png";
import image2 from "../images/image 16.png";
import image3 from "../images/image 6.png";
import image4 from "../images/image 23.png";
import image5 from "../images/image 25.png";
import image6 from "../images/image 28.png";
import image7 from "../images/image 29.png";
import image8 from "../images/image 7.png";
import image9 from "../images/image 8.png";
import image10 from "../images/image 9.png";
import image11 from "../images/image 10.png";
import image12 from "../images/image 11.png";
import image13 from "../images/image 12.png";
import image14 from "../images/image 13.png";
import image15 from "../images/image 17.png";


import anonUser from "../images/user.png";
import p1 from "../images/p1.png"
import svg1 from "../images/svg/angle.svg";
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
                        <div className = "upperView">
                        <div className="col1" >
                            <img className="img1" src={image1} alt="image1" />
                            <img className="ellispse" src= {p1} alt = "ellipse"/>
                            <img  className= "image8"  src= {image8} alt="img"/>
                            <img  className= "image9"  src= {image9} alt="img"/>
                            <img  className= "image10"  src= {image10} alt="img"/>
                            <img  className= "image11"  src= {image11} alt="img"/>
                            <img  className= "image12"  src= {image12} alt="img"/>
                             <img  className= "image13"  src= {image13} alt="img"/> 
                            <img  className= "image14"  src= {image14} alt="img"/>
                             <img  className= "image15"  src= {image15} alt="img"/>   
                        </div>
                        <div className="col2">
                            <Grid container justify="center" alignContent="center" direction="column">
                                <img className="img2" src={image2} alt="image1" />
                                <p className="text1"> You can SELL and BUY digital art work here.
                            <br />
                            The art work can be used in yuor Superworld</p>
                            </Grid>

                            <button className="start-btn">
                                Start
                            </button>
                        </div>

                        </div>
                        
                        <br /> <br /><br /><br />
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10%' }}>
                            <p style={{ fontSize: '18px', fontFamily: 'Gibson', fontWeight: 'bold' }}> Trending</p>
                            <a href="" style={{ fontFamily: 'Gibson', fontWeight: '550', fontSize: '18px' }}> View more <img src={svg1} alt="svg1" /></a>
                        </div>
                        <div className="rowImages">
                                <Card className="imageCards">
                                <CardImg top width="100%" src={image3} alt="Image3"></CardImg>
                                    <CardBody>
                                        <div style= {{
                                            display:'flex',
                                            justifyContent: 'center',
                                            
                                        }}>
                                        <CardSubtitle >
                                        <img 
                                        style={{
                                            marginRight:'30px'
                                        }}
                                        width='16px'
                                        height='16px' 
                                        className='rounded-circle'
                                        src={anonUser} 
                                            ></img>
                                            </CardSubtitle>
                                        <CardSubtitle 
                                        style={{
                                            fontFamily: 'Gibson',
                                            fontSize: '14px',
                                            color: '#5540C7',   
                                        }}
                                        
                                        > {"Anonymous User"} </CardSubtitle>
                                        </div>
                                        <div className="ctext">
                                        <CardText
                                        style={{
                                            fontFamily: 'Gibson',
                                            fontSize: '15px',
                                            color: '#5540C7',
                                        }} >Alimation Character</CardText>
                                        <CardText style={{fontFamily: 'Gibson',
                                            fontSize: '12px',
                                            color: '#5540C7',

                                        }}>0.5ETH</CardText>
                                        </div>
                                       
                                    </CardBody>
                                </Card>
                                
                        </div>

                        <br /><br /><br /><br /><br /><br /><br />
                    </Container>


                </div>
                <br />
                <br /><br /><br /><br />
            </>
        );
    }
}

export default Home;
