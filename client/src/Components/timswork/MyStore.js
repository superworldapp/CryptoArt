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
                                <div class='mystore-modal-bg'>
                                    <div class='mystore-modal secondIt'>
                                        <h2>Subscribe</h2>
                                        <button onClick={this.toggleModal}>X</button>
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