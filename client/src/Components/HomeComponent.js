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
} from 'reactstrap';
import { Grid } from '@material-ui/core';
import image1 from '../images/image 15.png';
import image2 from '../images/image 16.png';
import image3 from '../images/image 6.png';
import image4 from '../images/image 23.png';
import image5 from '../images/image 25.png';
import image6 from '../images/image 28.png';
import image7 from '../images/image 29.png';
import image8 from '../images/image 7.png';
import image9 from '../images/image 8.png';
import image10 from '../images/image 9.png';
import image11 from '../images/image 10.png';
import image12 from '../images/image 11.png';
import image13 from '../images/image 12.png';
import image14 from '../images/image 13.png';
import image15 from '../images/image 17.png';

import anonUser from '../images/user.png';
import p1 from '../images/p1.png';
import svg1 from '../images/svg/angle.svg';
import './HomeComponent.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  cData = () => {
    const Trendingcard = [
      {
        cImg: 'image3',
        calt: 'img3',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Creation',
        price: '0.5ETH',
      },
      {
        cImg: 'image4',
        calt: 'img4',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Creation',
        price: '0.5ETH',
      },

      {
        cImg: 'image5',
        calt: 'img5',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Creation',
        price: '0.5ETH',
      },

      {
        cImg: 'image6',
        calt: 'img6',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Creation',
        price: '0.5ETH',
      },
      {
        cImg: 'image7',
        calt: 'img7',
        uimg: 'annonuser',
        uname: 'annon name',
        ctitle: 'Alimation Creation',
        price: '0.5ETH',
      },
    ];
  };

  render() {
    return (
      <>
        <div className='Home'>
          <Container>
            <div className='upperView'>
              <div>
                <h1 id='header'>A WORLD FOR TRADING YOUR ARTWORK</h1>
                <p className='text1'>
                  {' '}
                  You can SELL and BUY digital art work here
                  <br />
                  And share it in your{' '}
                  <a target='blank' href='https://www.superworldapp.com/'>
                    SuperWorld
                  </a>
                </p>
                <div id='start-btn'>
                  <button className='start-btn'>Start</button>
                </div>
              </div>
              <div className='col1'>
                {/* <img className='img1' src={image1} alt='image1' /> */}
                {/* <img className='ellispse' src={p1} alt='ellipse' /> */}
                <img className='image8' src={image13} alt='img' />
                <img className='image9' src={image13} alt='img' />
                <img className='image10' src={image13} alt='img' />
                <div>
                  <img className='image11' src={image13} alt='img' />
                </div>
                <img className='image12' src={image13} alt='img' />
                <img className='image13' src={image13} alt='img' />
                <img className='image14' src={image13} alt='img' />
                <img className='image15' src={image13} alt='img' />
              </div>
              <div className='col2'>
                <Grid
                  container
                  justify='center'
                  alignContent='center'
                  direction='column'
                ></Grid>
              </div>
            </div>
            <br /> <br />
            <br />
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10%',
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
                Trending
              </p>
              <a
                href=''
                style={{
                  fontFamily: 'Gibson',
                  fontWeight: '550',
                  fontSize: '18px',
                }}
              >
                {' '}
                View more <img src={svg1} alt='svg1' />
              </a>
            </div>
            <div className='rowImages'>
              <Card className='imageCards'>
                <CardImg top width='100%' src={image3} alt='image3'></CardImg>
                <CardBody>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CardSubtitle>
                      <img
                        style={{
                          marginRight: '30px',
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
                    >
                      {' '}
                      User Name{' '}
                    </CardSubtitle>
                  </div>
                  <div className='ctext'>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#5540C7',
                      }}
                    >
                      Alimation Creation
                    </CardText>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '12px',
                        color: '#5540C7',
                      }}
                    >
                      0.5ETH
                    </CardText>
                  </div>
                </CardBody>
              </Card>
              <Card className='imageCards'>
                <CardImg top width='100%' src={image4} alt='image3'></CardImg>
                <CardBody>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CardSubtitle>
                      <img
                        style={{
                          marginRight: '30px',
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
                    >
                      {' '}
                      User Name{' '}
                    </CardSubtitle>
                  </div>
                  <div className='ctext'>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#5540C7',
                      }}
                    >
                      Alimation Creation
                    </CardText>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '12px',
                        color: '#5540C7',
                      }}
                    >
                      0.5ETH
                    </CardText>
                  </div>
                </CardBody>
              </Card>
              <Card className='imageCards'>
                <CardImg top width='100%' src={image5} alt='image3'></CardImg>
                <CardBody>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CardSubtitle>
                      <img
                        style={{
                          marginRight: '30px',
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
                    >
                      {' '}
                      User Name{' '}
                    </CardSubtitle>
                  </div>
                  <div className='ctext'>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#5540C7',
                      }}
                    >
                      Alimation Creation
                    </CardText>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '12px',
                        color: '#5540C7',
                      }}
                    >
                      0.5ETH
                    </CardText>
                  </div>
                </CardBody>
              </Card>
              <Card className='imageCards'>
                <CardImg top width='100%' src={image6} alt='image3'></CardImg>
                <CardBody>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CardSubtitle>
                      <img
                        style={{
                          marginRight: '30px',
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
                    >
                      {' '}
                      User Name{' '}
                    </CardSubtitle>
                  </div>
                  <div className='ctext'>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#5540C7',
                      }}
                    >
                      Alimation Creation
                    </CardText>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '12px',
                        color: '#5540C7',
                      }}
                    >
                      0.5ETH
                    </CardText>
                  </div>
                </CardBody>
              </Card>
              <Card className='imageCards'>
                <CardImg top width='100%' src={image7} alt='image3'></CardImg>
                <CardBody>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <CardSubtitle>
                      <img
                        style={{
                          marginRight: '30px',
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
                    >
                      {' '}
                      User Name{' '}
                    </CardSubtitle>
                  </div>
                  <div className='ctext'>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '15px',
                        color: '#5540C7',
                      }}
                    >
                      Alimation Creation
                    </CardText>
                    <CardText
                      style={{
                        fontFamily: 'Gibson',
                        fontSize: '12px',
                        color: '#5540C7',
                      }}
                    >
                      0.5ETH
                    </CardText>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }
}

export default Home;
