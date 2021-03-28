import React, { Component } from 'react';
import '../App.css';
// import { Container } from 'reactstrap';
import {
  Container,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  CardImgOverlay,
  Row,
  Col,
  CardTitle,
  Badge,
} from 'reactstrap';
//import Identicon from 'identicon.js';
import { Grid } from '@material-ui/core';
import image1 from '../images/image 166.png';
import image2 from '../images/image 167.png';
import image3 from '../images/image 177.png';
import image4 from '../images/image 179.png';
import image5 from '../images/image 178.png';
import image6 from '../images/image 169.png';
import image7 from '../images/image 176.png';
import image8 from '../images/image 175.png';
import image9 from '../images/image 180.png';
import image10 from '../images/image 168.png';
import image11 from '../images/image 6.png';
import image12 from '../images/image 25.png';
import image13 from '../images/image 28.png';
import image14 from '../images/image 130.png';
import image15 from '../images/image 24.png';
import AnkorWat from '../images/Mask Group-2.png';
import Bluedomesofoia from '../images/Mask Group-1.png';
import Greatwalls from '../images/Mask Group.png';
import Downtowntoronto from '../images/image 164.png';
import Timesquare from '../images/image 165.png';
import Nate1 from '../images/Nate1.jpg';
import Nate2 from '../images/Nate2.jpg';
import Nate3 from '../images/Nate3.jpg';
import Nate4 from '../images/Nate4.jpg';

import Auth from './Auth';
import SignInModal from './SignInModal/SignInModal';
import { LayoutContext } from '../state/Layout/context';

import anonUser from '../images/user.png';
import swicon from  "../images/Group 220.png";
import p1 from '../images/p1.png';
import svg1 from '../images/svg/angle.svg';
import './HomeComponent.css';
import { Redirect, Link } from 'react-router-dom';

class Home extends Component {
  static contextType = LayoutContext;

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loggedIn: false,
      startClicked: false,
    };
    this.handleStartClick = this.handleStartClick.bind(this);
  }

  cData = () => {
    const Trendingcard = [
      {
        cImg: 'image3',
        calt: 'img3',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Character',
        price: '0.5ETH',
      },
      {
        cImg: 'image4',
        calt: 'img4',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Character',
        price: '0.5ETH',
      },

      {
        cImg: 'image5',
        calt: 'img5',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Character',
        price: '0.5ETH',
      },

      {
        cImg: 'image6',
        calt: 'img6',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Character',
        price: '0.5ETH',
      },
      {
        cImg: 'image7',
        calt: 'img7',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Character',
        price: '0.5ETH',
      },
    ];
  };

  handleStartClick() {
    console.log('in start click');
    if (Auth.getAuth()) {
      this.setState({ startClicked: true, loggedIn: true });
    } else {
      this.setState({ startClicked: true });
      this.context.dispatch({
        type: 'TOGGLE_SIGN_IN_MODAL',
        payload: !this.context.state.signInModalIsOpen,
      });
    }
  }

  render() {
    if (this.state.loggedIn && this.state.startClicked) {
      return <Redirect to='/allart' />;
    } else {
      return (
        <>
          <div className='Home'>
            <Container>
              <div className= "upperView">
              <div className ="sectionText1">
                  <h1 id='header'>WELCOME TO THE <br/> NFT SALON</h1>
                  <p className='text1'>
                    {' '}
                    BUY 
                    <span className= "text2">
                      and
                    </span>
                     SELL
                    <span className ="text2">
                    {' '}NFT's here
                    <br />
                    to help you curate your{' '}
                    </span>
                    <a target='blank' href='https://www.superworldapp.com/'>
                      SuperWorld
                    </a>
                  </p>
                  <div id='start-btn'>
                    <button
                      className='start-btn'
                      onClick={this.handleStartClick}
                    >
                      Explore
                    </button>
                  </div>
                </div>
                <div className="col1">

                  <div className='home-slider'>
                      <figure>
                        <img className='topimage' src={image1} alt='img' />
                        <img className='topimage' src={image2} alt='img' />
                        <img className='topimage' src={image3} alt='img' />
                        <img className='topimage' src={image4} alt='img' />
                        <img className='topimage' src={image1} alt='img' />
                      </figure>
                  </div>

                </div>
              </div>
              </Container>
              <br/>

              <div style={{height: '1.5rem', backgroundColor:' #D5D7FA',}}></div>
              <br/>
              <div style={{height: '1.5rem', backgroundColor:' #D5D7FA'}}></div>
              <Container>
              <div className='middleView'>
              <div className="col2">
              <Row around="xs" className= "gridRow1">
                <Col xs={2}  className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-1'>
                    <figure>
                      <img src ={image2} className="image10" alt="image10" />
                      <img src ={image3} className="image10" alt="image10" />
                      <img src ={image2} className="image10" alt="image10" />
                      <img src ={image3} className="image10" alt="image10" />
                      <img src ={image2} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col> 
                  <Col xs={2} className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-2'>
                    <figure>
                      <img src ={image3} className="image10" alt="image10" />
                      <img src ={image4} className="image10" alt="image10" />
                      <img src ={image3} className="image10" alt="image10" />
                      <img src ={image4} className="image10" alt="image10" />
                      <img src ={image3} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  <Col xs={2} className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-3'>
                    <figure>
                      <img src ={image4} className="image10" alt="image10" />
                      <img src ={image5} className="image10" alt="image10" />
                      <img src ={image4} className="image10" alt="image10" />
                      <img src ={image5} className="image10" alt="image10" />
                      <img src ={image4} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  </Row>
                  <Row around="xs" className= "gridRow2">
                  <Col xs={2} className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-4'>
                    <figure>
                      <img src ={image5} className="image10" alt="image10" />
                      <img src ={image6} className="image10" alt="image10" />
                      <img src ={image5} className="image10" alt="image10" />
                      <img src ={image6} className="image10" alt="image10" />
                      <img src ={image5} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  <Col xs={2} className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-5'>
                    <figure>
                      <img src ={image6} className="image10" alt="image10" />
                      <img src ={image7} className="image10" alt="image10" />
                      <img src ={image6} className="image10" alt="image10" />
                      <img src ={image7} className="image10" alt="image10" />
                      <img src ={image6} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  <Col xs={2} className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-6'>
                    <figure>
                      <img src ={image7} className="image10" alt="image10" />
                      <img src ={image8} className="image10" alt="image10" />
                      <img src ={image7} className="image10" alt="image10" />
                      <img src ={image8} className="image10" alt="image10" />
                      <img src ={image7} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  </Row>
                   <Row around="xs" className = "gridRow3">
                  <Col xs={2} className= "gridCol1" >
                  <div className='home-slider-multiple home-slider-multiple-7'>
                    <figure>
                      <img src ={image8} className="image10" alt="image10" />
                      <img src ={image9} className="image10" alt="image10" />
                      <img src ={image8} className="image10" alt="image10" />
                      <img src ={image9} className="image10" alt="image10" />
                      <img src ={image8} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  <Col xs={2} className= "gridCol1" >
                  <div className='home-slider-multiple home-slider-multiple-8'>
                    <figure>
                      <img src ={image9} className="image10" alt="image10" />
                      <img src ={image10} className="image10" alt="image10" />
                      <img src ={image9} className="image10" alt="image10" />
                      <img src ={image10} className="image10" alt="image10" />
                      <img src ={image9} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                  <Col xs={2} className= "gridCol1">
                  <div className='home-slider-multiple home-slider-multiple-9'>
                    <figure>
                      <img src ={image10} className="image10" alt="image10" />
                      <img src ={image11} className="image10" alt="image10" />
                      <img src ={image10} className="image10" alt="image10" />
                      <img src ={image11} className="image10" alt="image10" />
                      <img src ={image10} className="image10" alt="image10" />
                    </figure>
                  </div>
                  </Col>
                </Row> 
                </div> 
                <div className ="sectionText2">
                  <h1 id='header'>FEATURED NFT's <br/> OF THE DAY</h1>
                  <p className='text2'>
                    
                    Each day brings something new, 
                    view our ever changing 
                    <br/>
                    gallery of NFT's from a wide range 
                    of salon creators
                    <br />
                    {/* And share it in your{' '}
                    <a target='blank' href='https://www.superworldapp.com/'>
                      SuperWorld
                    </a> */}
                    <br/>
                    <br/>
                  </p>
                  <div id='start-btn'>
                    <button
                      className='start-btn'
                      onClick={this.handleStartClick}
                    >
                      Explore
                    </button>
                  </div>
                  
                </div>
                {/* <div className='col1'>
                  <img className='img1' src={image1} alt='image1' /> 
                  <img className='ellispse' src={p1} alt='ellipse' /> 
                  <img className='image8' src={Nate1} alt='img' />
                  <img className='image9' src={Nate2} alt='img' />
                  <img className='image10' src={image13} alt='img' />
                  <div>
                    <img className='image11' src={image13} alt='img' />
                  </div>
                  <img className='image12' src={Nate3} alt='img' />
                  <img className='image13' src={image13} alt='img' />
                  <img className='image14' src={image13} alt='img' />
                  <img className='image15' src={Nate4} alt='img' />
                </div> 
                { <div className='col2'>
                  <Grid
                    container
                    justify='center'
                    alignContent='center'
                    direction='column'
                  ></Grid>
                </div>
              </div> */}
              </div>
              </Container>
              <br /> 
              <div style={{height: '1.5rem', backgroundColor:' #D5D7FA'}}></div>
              <br/>
              <div style={{height: '1.5rem', backgroundColor:' #D5D7FA'}}></div>
              <Container>
              <div className ="bottomView">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '5%',
                  margin:'1.5rem'
                }}
              >
                <p
                  style={{
                    fontSize: '18px',
                    fontFamily: 'Gibson',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  Trending NFT's
                </p>
                <a
                  href=''
                  style={{
                    fontFamily: 'Gibson',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textDecoration: 'none',
                    color: '#B3B3B3',
                  }}
                >
                  {' '}
                  View More <img src={svg1} alt='svg1' />
                </a>
              </div>
              <div className='rowImages'>
              <Card className='imageCards'>
                  <CardImg
                    top
                    
                    className="Cardimg"
                    src={image11}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                   {/* <img
                  className="userimg"
                  id='profile'
                      src={`data:image/png;base64,${new Identicon(
                        new Date().toString()
                      )}`}
                  alt='profile'
                > </img>  */}
                <img
                  className="userimg"
                  src={anonUser}
                ></img> 
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Octo
                    </CardTitle> 
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       Cjsmith
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={image12}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={anonUser}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      New Planet PitStop
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       SaraViz
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={image13}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={anonUser}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Break Free
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                    <div className="cardImg-body">
                      <CardSubtitle className="createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       Olivia
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className="price">
                        0.5ETH
                        <p className= "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='buy-bid-btn'>Place Bid</button>
                      </div>
                    </div> 
                    <div className='buy-bid-btn-div'>
                        <p className="time-div">
                          26 hrs 42 mins remaining
                        </p>
                      </div>
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={image14}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={anonUser}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Look
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                    <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className="cardsubtitleName">
                       Mai
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className="price">
                        0.5ETH
                        <p className="USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='buy-bid-btn'>Place Bid</button>
                      </div>
                    </div> 
                    <div className='buy-bid-btn-div'>
                      
                        <p className='time-div'>
                        26 hrs 42 mins remaining
                        </p>
                      </div>
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={image15}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={anonUser}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Faces
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       kyliehart
                      </CardSubtitle>
                    </div>                    
                     <div className='ctext'>
                      <CardText className = "price">
                        0.5ETH
                        <p className = "USD-price">
                        ($985.56 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '7%',
                  margin:'1.5rem'
                }}
              >
                <p
                  style={{
                    fontSize: '18px',
                    fontFamily: 'Gibson',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  Popular in Real Estate
                </p>
                <a
                  href=''
                  style={{
                    fontFamily: 'Gibson',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textDecoration: 'none',
                    color: '#B3B3B3',
                  }}
                >
                  {' '}
                  View More <img src={svg1} alt='svg1' />
                </a>
              </div>
              <div className='rowImages'>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={AnkorWat}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={swicon}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Angkor Wat
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       SuperWorld
                      </CardSubtitle>
                    </div>
                    {/* <div className='ctext'>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        Arc de Triomphe
                      </CardText>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                        }}
                      >
                        0.1ETH
                      </CardText>
                    </div>
                    <div className='buy-bid-btn-div'>
                      <div className='time-div'></div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                        style={{ marginTop: '0.85rem' }}
                      >
                        <button className='buy-bid-btn'>Purchase</button>
                      </a>
                    </div>
                     */}
                     <div className='ctext'>
                      <CardText className = "price">
                        0.1ETH
                        <p className = "USD-price">
                        ($176.61 USD)
                          </p>
                      </CardText>
                      <div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                      >
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </a>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={Bluedomesofoia}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={swicon}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Blue Domes of Oia
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                      
                       SuperWorld
                      </CardSubtitle>
                    </div>
                    {/* <div className='ctext'>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        The Great Pyramid of Giza
                      </CardText>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: '#black',
                        }}
                      >
                        0.1ETH
                      </CardText>
                    </div>
                    <div className='buy-bid-btn-div'>
                      <div className='time-div'>
                        <p
                          style={{
                            fontFamily: 'Gibson',
                            fontSize: '9px',
                            color: 'gray',
                            marginLeft: '0.35rem',
                            marginBottom: '0rem',
                          }}
                        ></p>
                      </div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                        style={{ marginTop: '0.85rem' }}
                      >
                        <button className='buy-bid-btn'>Purchase</button>
                      </a>
                    </div> */}
                    <div className='ctext'>
                      <CardText className = "price">
                        0.1ETH
                        <p className = "USD-price">
                        ($176.61 USD)
                          </p>
                      </CardText>
                      <div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                      >
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </a>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={Greatwalls}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={swicon}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Great Wall
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       SuperWorld
                      </CardSubtitle>                    
                      </div>
                    {/* <div className='ctext'>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        The Colosseum
                      </CardText>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                        }}
                      >
                        0.1ETH
                      </CardText>
                    </div>
                    <div className='buy-bid-btn-div'>
                      <div className='time-div'>
                        <p
                          style={{
                            fontFamily: 'Gibson',
                            fontSize: '9px',
                            color: 'gray',
                            marginLeft: '0.35rem',
                            marginBottom: '0rem',
                          }}
                        ></p>
                      </div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                        style={{ marginTop: '0.85rem' }}
                      >
                        <button className='buy-bid-btn'>Purchase</button>
                      </a>
                    </div> */}
                    <div className='ctext'>
                      <CardText className = "price" >
                        0.1ETH
                        <p className = "USD-price">
                        ($176.61 USD)
                          </p>

                      </CardText>
                      <div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                      >
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </a>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={Downtowntoronto}
                    alt='image3'
                  ></CardImg>
                  <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={swicon}
                ></img>
              </Badge>
                    <CardTitle className="card-imgTitle" >
                      Downtown Toronto
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       SuperWorld
                      </CardSubtitle>

                    </div>
                    {/* <div className='ctext'>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        Neuschwanstein Castle
                      </CardText>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                        }}
                      >
                        0.1ETH
                      </CardText>
                    </div>
                    <div className='buy-bid-btn-div'>
                      <div className='time-div'></div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                        style={{ marginTop: '0.85rem' }}
                      >
                        <button className='buy-bid-btn'>Purchase</button>
                      </a>
                    </div> */}
                    <div className='ctext'>
                      <CardText className = "price">
                        0.1ETH
                        <p className = "USD-price">
                        ($176.61 USD)
                          </p>
                      </CardText>
                      
                      <div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                      >
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </a>
                      </div>
                      
                    </div> 

                  </CardBody>
                </Card>
                <Card className='imageCards'>
                  <CardImg
                    top
                    className="Cardimg"
                    src={Timesquare}
                    alt='image3'
                  ></CardImg>
                 <CardImgOverlay className="imgOverlay">
                  <Badge pill className= "sw-overlay">
                  <img
                  className="userimg"
                  src={swicon}
                ></img>
              </Badge>
                  
                    <CardTitle className="card-imgTitle" >
                      Times Square
                    </CardTitle>
                  </CardImgOverlay>
                  <CardBody>
                  <div className="cardImg-body">
                      <CardSubtitle className= "createdby">
                        Created by 
                      </CardSubtitle>
                      &nbsp;
                      <CardSubtitle className = "cardsubtitleName">
                       SuperWorld
                      </CardSubtitle>
                    </div>
                    {/* <div className='ctext'>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        Golden Temple
                      </CardText>
                      <CardText
                        style={{
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          color: 'black',
                        }}
                      >
                        0.1ETH
                      </CardText>
                    </div>
                    <div className='buy-bid-btn-div'>
                      <div className='time-div'>
                        <p
                          style={{
                            fontFamily: 'Gibson',
                            fontSize: '9px',
                            color: 'gray',
                            marginLeft: '0.35rem',
                            marginBottom: '0rem',
                          }}
                        ></p>
                      </div>
                      <a
                        target='blank'
                        href='https://map.superworldapp.com/'
                        style={{ marginTop: '0.85rem' }}
                      >
                        <button className='buy-bid-btn'>Purchase</button>
                      </a>
                    </div> */}
                    <div className='ctext'>
                      <CardText className = "price">
                        0.1ETH
                        <p className = "USD-price">
                        ($176.61 USD)
                          </p>
                      </CardText>
                      <div>
                      <button className='buy-bid-btn'>BUY {' '}NOW</button>
                      </div>
                    </div> 
                  </CardBody>
                </Card>
              </div>
              </div>
              <br/>
              <br/>
              <br/>
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </>
      );
    }
  }
}

export default Home;