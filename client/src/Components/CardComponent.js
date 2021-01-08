import React from 'react';
import MarioImage from '../images/image 13.png';

const CardComponent = () => {
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-between mt-5 py-5'>
                    <div
                        className='card'
                        style={{
                            width: '50%'
                        }}>
                        <img src={MarioImage} class='card-img' alt='...' />
                    </div>
                    <div className='information d-flex flex-column'>
                        <a href='#'>Arcona Digital Land</a>
                        <h1>Mario</h1>
                        <p>
                            Owned by <a href='#'>ABU01</a>
                        </p>
                        <div
                            className='card py-3'
                            style={{
                                width: '30rem'
                            }}>
                            <p className='text-secondary'>Current price</p>
                            <h4>
                                0.23{' '}
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
                <div className='trading-history mb-5'>
                    <div
                        className='card px-3'
                        style={{
                            width: '90%'
                        }}>
                        <h4
                            className='mx-3'
                            style={{
                                textAlign: 'left'
                            }}>
                            Trading History
                        </h4>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className="text-secondary" scope='col'>Event</th>
                                    <th className="text-secondary" scope='col'>Price</th>
                                    <th className="text-secondary" scope='col'>From</th>
                                    <th className="text-secondary" scope='col'>To</th>
                                    <th className="text-secondary" scope='col'>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'>List</th>
                                    <td>0.23</td>
                                    <td>
                                        <a href='#'>Abu01</a>
                                    </td>
                                    <td></td>
                                    <td>
                                        <a href='#'>33 minutes ago</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope='row'>Offer</th>
                                    <td>1,000</td>
                                    <td>
                                        <a href='#'>kirkins</a>
                                    </td>
                                    <td></td>
                                    <td>
                                        <a href='#'>2 months ago</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope='row'>Cancel</th>
                                    <td>0.45</td>
                                    <td>
                                        <a href='#'>ABU01</a>
                                    </td>
                                    <td></td>
                                    <td>
                                        <a href='#'>2 months ago</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope='row'>List</th>
                                    <td>0.45</td>
                                    <td>
                                        <a href='#'>ABU01</a>
                                    </td>
                                    <td></td>
                                    <td>
                                        <a href='#'>2 months ago</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardComponent;
