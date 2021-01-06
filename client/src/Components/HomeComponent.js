import React, { Component } from 'react';
import '../App.css';
// import { Container } from 'reactstrap';
import { Grid, Container, Card, CardContent} from '@material-ui/core';
import image1 from "../images/image 15.png";
import image2 from "../images/image 16.png";
import image3 from "../images/image 6.png";
import image4 from "../images/image 23.png";
import image5 from "../images/image 25.png";
import image6 from "../images/image 28.png";
import image7 from "../images/image 29.png";
import svg1  from "../images/svg/angle.svg";
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
                        <br/> <br/><br/><br/>
                        <div style={{ display:'flex', justifyContent: 'space-between', paddingTop: '5%'}}>
                            <p style={{fontSize:'18px', fontFamily:'Gibson', fontWeight:'bold'}}> Trending</p>
                            <a href ="" style={{fontFamily:'Gibson', fontWeight:'550', fontSize:'18px'}}> View more <img src= {svg1} alt="svg1"/></a>
                        </div>
                        <div className= "rowImages">
                            <Grid container justify= "space-between"direction="row" alignContent= "flex-start">
                                
                            <Card className="imageCards">
                                    <CardContent>
                                        <Grid justify="space-around" direction="column" alignContent="center">
                                            <img className="img3" src={image3} alt="image3" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '18px',
                                                    color: '#5540C7',
                                                    padding: '7px',
                                                    marginTop: '1%',
                                                    marginRight: '1%',
                                                    position: 'absolute'
                                                }}>Alimation Character</p>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '16px',
                                                    marginLeft: '10%',
                                                    padding: '7px',
                                                    marginTop: '1.2%',
                                                    position: 'absolute',
                                                    color: 'black'
                                                }}> 0.5ETH</p>

                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Card>

                                <Card className="imageCards">
                                    <CardContent>
                                        <Grid justify="space-around" direction="column" alignContent="center">
                                            <img className="img3" src={image4} alt="image4" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '18px',
                                                    color: '#5540C7',
                                                    padding: '7px',
                                                    marginTop: '1%',
                                                    marginRight: '1%',
                                                    position: 'absolute'
                                                }}>Alimation Character</p>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '16px',
                                                    marginLeft: '10%',
                                                    padding: '7px',
                                                    marginTop: '1.2%',
                                                    position: 'absolute',
                                                    color: 'black'
                                                }}> 0.5ETH</p>

                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                <Card className="imageCards">
                                    <CardContent>
                                        <Grid justify="space-around" direction="column" alignContent="center">
                                            <img className="img3" src={image5} alt="image3" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '18px',
                                                    color: '#5540C7',
                                                    padding: '7px',
                                                    marginTop: '1%',
                                                    marginRight: '1%',
                                                    position: 'absolute'
                                                }}>Alimation Character</p>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '16px',
                                                    marginLeft: '10%',
                                                    padding: '7px',
                                                    marginTop: '1.2%',
                                                    position: 'absolute',
                                                    color: 'black'
                                                }}> 0.5ETH</p>

                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                <Card className="imageCards">
                                    <CardContent>
                                        <Grid justify="space-around" direction="column" alignContent="center">
                                            <img className="img3" src={image6} alt="image3" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '18px',
                                                    color: '#5540C7',
                                                    padding: '7px',
                                                    marginTop: '1%',
                                                    marginRight: '1%',
                                                    position: 'absolute'
                                                }}>Alimation Character</p>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '16px',
                                                    marginLeft: '10%',
                                                    padding: '7px',
                                                    marginTop: '1.2%',
                                                    position: 'absolute',
                                                    color: 'black'
                                                }}> 0.5ETH</p>

                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Card> <Card className="imageCards">
                                    <CardContent>
                                        <Grid justify="space-around" direction="column" alignContent="center">
                                            <img className="img3" src={image7} alt="image3" />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '18px',
                                                    color: '#5540C7',
                                                    padding: '7px',
                                                    marginTop: '1%',
                                                    marginRight: '1%',
                                                    position: 'absolute'
                                                }}>Alimation Character</p>
                                                <p style={{
                                                    fontFamily: 'Gibson',
                                                    fontSize: '16px',
                                                    marginLeft: '10%',
                                                    padding: '7px',
                                                    marginTop: '1.2%',
                                                    position: 'absolute',
                                                    color: 'black'
                                                }}> 0.5ETH</p>

                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            
                            {/* <img className="img3" src={image4} alt="image4" />
                            <img className="img3" src={image5} alt="image5" />
                            <img className="img3" src={image6} alt="image6" />
                            <img className="img3" src={image7} alt="image7" />
                             */}

                            </Grid>
                        </div>
                   
                        <br/><br/><br/><br/><br/><br/><br/>
                        </Container>


                </div>
                <br/>
                <br/><br/><br/><br/>
            </>
        );
    }
}

export default Home;
