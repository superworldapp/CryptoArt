import React, { useEffect } from 'react';
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardImg,
    CardHeader,
    Table
} from 'reactstrap';
import image3 from '../images/image 6.png';
import image4 from '../images/image 23.png';
import image5 from '../images/image 25.png';
import image6 from '../images/image 28.png';
import image7 from '../images/image 29.png';
import annonuser from '../images/user.png';
import Web3 from 'web3';

const CardDetail = ({ art, accounts, contract }) => {
    // useEffect(() => {
    //     console.log(match);
    // });
    console.log(art);
    const cdata = [
        {
            cImg: image3,
            calt: 'img3',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        },
        {
            cImg: image4,
            calt: 'img4',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        },

        {
            cImg: image5,
            calt: 'img5',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        },

        {
            cImg: image6,
            calt: 'img6',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        },
        {
            cImg: image7,
            calt: 'img7',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        },
        {
            cImg: image7,
            calt: 'img7',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        },
        {
            cImg: image7,
            calt: 'img7',
            uimg: annonuser,
            uname: 'annon name',
            ctitle: 'Alimation Creation',
            price: '0.5ETH'
        }
    ];

    //   const buyItem = async () => {
    //         const res = await contract.methods
    //             .buyToken(art.tokenIdentifier)
    //             .send({
    //                 from: accounts,
    //                 value: art.tokenSellPrice,
    //                 gas: 1000000
    //             });
    //         console.log(res);
    //     };
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mt-5 py-5'>
                    <div
                        className='card'
                        style={{
                            width: '50%'
                        }}>
                        <a href={art?.imgurl} target='_blank'>
                            <img
                                src={art?.imgurl}
                                className='card-img'
                                alt='...'
                            />
                        </a>
                    </div>
                    <div className='information d-flex flex-column'>
                        {/* <a href='#'>{match.params.id}</a>
                        <h1>{match.params.id}</h1> */}
                        <p>
                            Owned by <a href='#'>{art?.tokenCreator}</a>
                        </p>
                        <div
                            className='card py-3'
                            style={{
                                width: '30rem'
                            }}>
                            <p className='text-secondary'>Current price</p>
                            <h4>
                                {Web3.utils.fromWei(
                                    art?.tokenPrice.toString(),
                                    'ether'
                                )}{' '}
                                ETH
                                <small>
                                    <span className='text-secondary'>
                                        (246.99)
                                    </span>
                                </small>
                            </h4>

                            <button
                                className={
                                    art.isSelling
                                        ? 'visible btn-primary'
                                        : 'invisible'
                                }
                                onClick={async () => {
                                    const res = await contract.methods
                                        .buyToken(art.tokenIdentifier)
                                        .send({
                                            from: accounts,
                                            value: art.tokenSellPrice,
                                            gas: 1000000
                                        });
                                    console.log(res);
                                }}
                                style={{
                                    width: '50%',
                                    alignSelf: 'center'
                                }}>
                                Buy Item
                            </button>
                            <button
                                className={
                                    art.isSelling
                                        ? 'invisible'
                                        : 'visible btn-primary'
                                }
                                color='primary'
                                style={{
                                    width: '50%',
                                    alignSelf: 'center'
                                }}>
                                Place Bid
                            </button>
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <Card
                        className='card'
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader
                            className='text-left'
                            style={{
                                backgroundColor: '#fff'
                            }}>
                            <h4>
                                <i class='fas fa-arrows-alt-v'></i> Trading
                                History
                            </h4>
                        </CardHeader>
                        {cdata.map((item) => {
                            return (
                                <React.Fragment key={item}>
                                    <CardBody>
                                        <Table>
                                            <tbody>
                                                <CardSubtitle>
                                                    <img
                                                        style={{
                                                            marginRight: '30px'
                                                        }}
                                                        width='16px'
                                                        height='16px'
                                                        className='rounded-circle'
                                                        src={
                                                            item.uimg
                                                        }></img>{' '}
                                                    {item.uname}{' '}
                                                </CardSubtitle>

                                                <div className='ctext'>
                                                    <CardText
                                                        style={{
                                                            fontFamily:
                                                                'Gibson',
                                                            fontSize: '15px',
                                                            color: '#5540C7'
                                                        }}>
                                                        Alimation Creation
                                                    </CardText>
                                                    <CardText
                                                        style={{
                                                            fontFamily:
                                                                'Gibson',
                                                            fontSize: '12px',
                                                            color: 'black'
                                                        }}>
                                                        0.5ETH
                                                    </CardText>
                                                </div>
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </React.Fragment>
                            );
                        })}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CardDetail;
