import React, { Component } from 'react';
import './MyStore.css'
import {Row} from 'reactstrap'
import test1img from '../../images/image 25.png'


class MyStore1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    render() {
        return (
        <div>
            <div className='mystore-container'>
                {/* <Row> */}
                    <div className='mystore-header'>
                        <h1>MyStore</h1>
                        <span><p>NFT'S LISTED</p><p>0</p></span>
                        <span><p>NFT'S SOLD</p><p>0</p></span>
                    </div>
                    <div className='mystore-art-container'>
                        <div className='mystore-art-container-header'>
                            <h2 className="mystore-active">QUEUE (1)</h2>
                            <h2>ACTIVE</h2>
                            <h2>ENDED</h2>
                            <h2>OFFERS</h2>
                        </div>
                        <div className='mystore-art-pieces'>
                            <div className='mystore-art-piece'>
                                <img src={test1img } />
                                <div className='mystore-art-caption'>
                                    <h2>Back Country Fishing</h2>
                                    <button onClick={this.toggleModal} className='mystore-list-btn'>List</button>
                                </div>
                            </div>
                            <div className='mystore-upload-art'>
                                <button className='mystore-upload-btn'>
                                    <div className='mystore-upload-add'>+</div>
                                </button>
                            </div>
                        </div>
                    </div>
                {/* </Row> */}
            </div>

            {/* Modal */}
                {
                    this.state.isModalOpen && (
                        <div>
                            {/* <button onClick={this.toggleModal}> */}
                                <div className='mystore-modal-bg'>
                                    <div className='mystore-modal'>
                                        <div className='mystore-resale-container'>
                                            <button onClick={this.toggleModal} className='mystore-resale-close'>X</button>
                                            <h3>NFT RESALE</h3>
                                            <p className='mystore-resale-description'>Image, Video, Audio or 3D Model</p>
                                            <div className='mystore-body-container'>
                                                <span className='mystore-body-line-1'><h4>File</h4><p className='mystore-body-line-1-p'>BackCountry...png</p></span>
                                                <span className='mystore-body-line-2'><h4>Auction</h4><input type='checkbox' className='mystore-body-line-2-checkbox'></input></span>
                                                <span className='mystore-body-line-3'><h4>Buy Now</h4><input type='checkbox' className='mystore-body-line-3-checkbox'></input></span>
                                                <span className='mystore-body-line-4'><h4>Token Price*</h4><input className='mystore-token-price'></input><p className='mystore-token-type'>ETH &nbsp;</p><p className='mystore-token-usd'>($1,580.10 USD)</p></span>
                                                <p className='mystore-body-line-4-subtitle'>(State Price if Auction)</p>
                                                <span className='mystore-body-line-5'><h4>Duration*</h4><input className='mystore-token-days'></input><p className='mystore-token-duration-subtitle'>Days</p></span>
                                                <button className='mystore-resale-btn'>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/* </button> */}
                        </div>
                    )
                }
            {/* */}

           
        </div>
        )
    }
}

export default MyStore1;