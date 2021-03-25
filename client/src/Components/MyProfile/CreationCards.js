import React, { Component } from 'react';
import './CreationCards.css';
import profile from '../../images/profile-image.png';
import image200 from '../../images/image 200.png';
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
  const CreationCards = () => {
      return (
        <>
          <Card className='imageCards'>
              <CardImg
                top
                className="Cardimg"
                src={image200}
                alt='image3'
              ></CardImg>
              <CardImgOverlay className="imgOverlay">
              <img className="userimg" src={profile}></img>
                <CardTitle className="card-imgTitle" >
                  Alimation Character
                </CardTitle>
              </CardImgOverlay>
              <CardBody>
                <div className="cardImg-body">
                  <CardSubtitle className= "createdby">
                    Created by 
                  </CardSubtitle>
                  &nbsp;
                  <CardSubtitle className="cardsubtitleName">
                  Amelia
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
        </>
      )
}

export default CreationCards
