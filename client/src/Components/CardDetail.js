import React, { useEffect } from 'react';
import image3 from '../images/image 6.png';
import image4 from '../images/image 23.png';
import image5 from '../images/image 25.png';
import image6 from '../images/image 28.png';
import image7 from '../images/image 29.png';
import annonuser from '../images/user.png';
import Web3 from 'web3';

const CardDetail = ({art}) => {
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
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mt-5 py-5'>
                    <div
                        className='card'
                        style={{
                            width: '50%'
                        }}>
                        <img src={art?.imgurl} className='card-img' alt='...' />
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
                                className='btn btn-primary'
                                style={{
                                    width: '50%',
                                    alignSelf: 'center'
                                }}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardDetail;