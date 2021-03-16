import React, { Component } from 'react';
import './MyStore.css'
import {Row} from 'reactstrap'
import test1img from '../../images/image 25.png'
import test2img from '../../images/image 29.png'


class MyStore1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isListModalOpen: false,
            isEditModalOpen: false,
            artStatus: 'Queue',
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.listToggleModal = this.listToggleModal.bind(this);
        this.editToggleModal = this.editToggleModal.bind(this);
        this.storeQueue = this.storeQueue.bind(this)
        this.storeActive = this.storeActive.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    listToggleModal() {
        this.setState({
            isListModalOpen: !this.state.isListModalOpen,
        });
    }

    editToggleModal() {
        this.setState({
            isEditModalOpen: !this.state.isEditModalOpen,
        });
    }

    storeQueue() {
        this.setState({
            artStatus: 'Queue',
        })
    }

    storeActive() {
        this.setState({
            artStatus: 'Active',
        })
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
                            <button onClick={this.storeQueue}><h2 className="mystore-active">QUEUE (1)</h2></button>
                            <button onClick={this.storeActive}><h2>ACTIVE</h2></button>
                            <button><h2>ENDED</h2></button>
                            <button><h2>OFFERS</h2></button>
                        </div>
                        {this.state.artStatus === 'Queue' && (
                            <div className='mystore-art-pieces'>
                                <div className='mystore-art-piece'>
                                    <img src={test1img } alt='art-1'/>
                                    <div className='mystore-art-caption'>
                                        <h2>Back Country Fishing</h2>
                                        <button onClick={this.toggleModal} className='mystore-list-btn'>List</button>
                                    </div>
                                </div>
                                <div className='mystore-upload-art'>
                                    <button onClick={this.listToggleModal} className='mystore-upload-btn'>
                                        <div className='mystore-upload-add'>+</div>
                                    </button>
                                </div>
                            </div>    
                        )}

                        {this.state.artStatus === 'Active' && (
                            <div className='mystore-art-pieces'>
                                <div className='mystore-art-piece'>
                                    <img src={test2img } alt='art-1'/>
                                    <div className='mystore-art-caption'>
                                        <h2>Leopard</h2>
                                        <span className='mystore-art-caption-line2'><p>1.00 ETH</p><button onClick={this.editToggleModal} className='mystore-edit-btn'>Edit</button></span>
                                        <p className='mystore-art-caption-usd'>($1,580.10 USD)</p>
                                    </div>
                                </div>
                            </div>  
                        )}
                    </div>
                {/* </Row> */}
            </div>

            {/* List Modal */}
                {
                    this.state.isModalOpen && (
                        <div>
                            {/* <button onClick={this.toggleModal}> */}
                                <div className='mystore-modal-bg'>
                                    <div className='mystore-modal'>
                                        <div className='mystore-resale-container'>
                                        <span className='mystore-resale-header'>
                                            <h3>NFT RESALE</h3>
                                            <button onClick={this.toggleModal} className='mystore-resale-close'>X</button>
                                        </span>
                                            
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

            {/* Upload Modal */}
                {this.state.isListModalOpen && (
                    <div className='mystore-modal-bg'>
                        <div className='upload-modal'>
                            <div className='upload-modal-container'>
                                <span className='upload-modal-header'>
                                    <h3>UPLOAD TO MYSTORE</h3>
                                    <button onClick={this.listToggleModal} className='upload-modal-close-btn'>X</button>
                                </span>
                                <p>Image, Video, Audio or 3D Model</p>
                                <span className='upload-modal-line1'><h4>File to Upload*</h4><button>Browse...</button><p>Leopard.png</p></span>
                                <span className='upload-modal-line2'><h4>Name*</h4><input type='text' placeholder='Leopard'/></span>
                                <span className='upload-modal-line3'><h4>Description</h4><input type='text' placeholder='Leopard'/></span>
                                <span className='upload-modal-line4'><h4>No. of Tokens</h4><input type='text' placeholder='Leopard'/></span>
                                <button className='upload-modal-btn'>Confirm</button>
                            </div>
                        </div>
                    </div>
                )}
            {/* */}

            {/* Edit Modal */}
                {this.state.isEditModalOpen && (
                    <div className='mystore-modal-bg'>
                    <div className='mystore-modal edit-modal'>
                        <div className='mystore-resale-container edit-modal-container'>
                                <span className='mystore-edit-modal-header'>
                                    <h3>EDIT LISTING</h3>
                                    <button onClick={this.editToggleModal} className='mystore-edit-close-btn'>X</button>
                                </span>
                                <p className='mystore-resale-description'>Image, Video, Audio or 3D Model</p>
                                <div className='mystore-body-container'>
                                    <span className='mystore-body-line-1'><h4>File</h4><p className='mystore-body-line-1-p'>BackCountry...png</p></span>
                                    <span className='mystore-body-line-2'><h4>Auction</h4><input type='checkbox' className='mystore-body-line-2-checkbox'></input></span>
                                    <span className='mystore-body-line-3'><h4>Buy Now</h4><input type='checkbox' className='mystore-body-line-3-checkbox'></input></span>
                                    <span className='mystore-body-line-4'><h4>Token Price*</h4><input className='mystore-token-price'></input><p className='mystore-token-type'>ETH &nbsp;</p><p className='mystore-token-usd'>($1,580.10 USD)</p></span>
                                    <p className='mystore-body-line-4-subtitle'>(State Price if Auction)</p>
                                    <span className='mystore-body-line-5'><h4>Duration*</h4><input className='mystore-token-days'></input><p className='mystore-token-duration-subtitle'>Days</p></span>
                                    <button className='mystore-relist-btn'>Relist</button>
                                    <button className='mystore-takedown-btn'>Take Down</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* */}

           
        </div>
        )
    }
}

export default MyStore1;