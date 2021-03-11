import React, { Component } from 'react';
import './MyStore.css'
import {Row, Modal, Input} from 'reactstrap'
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

            <Modal
            isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
            className='mystore-modal-box'
            >
                <div className='mystore-modal-headers'>
                    <h2>NFT RESALE</h2>
                    <p>Image, Video, Audio or 3D Model</p>
                </div>
                <div className='mystore-modal-body'>
                    <span className='mystore-modal-body-1'><h3>File</h3><p>BackCountry...png</p></span>
                    <span className='mystore-modal-body-2'><h3>Auction</h3><Input type='checkbox' className='modal-input' /></span>
                    <span className='mystore-modal-body-2'><h3>Buy Now</h3><Input type='checkbox' className='modal-input' /></span>
                </div>
            </Modal>

        </div>
        )
    }
}

export default MyStore1;