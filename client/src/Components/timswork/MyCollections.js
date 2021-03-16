import React, { Component } from 'react';
import './MyCollections.css'
import { Link } from 'react-router-dom';
import {Row} from 'reactstrap'
import test1img from '../../images/image 25.png'
import test2img from '../../images/image 11.png'
import test3img from '../../images/Nate3.jpg'
import test4img from '../../images/image 29.png'



class MyCollection1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGallery: '',
            isModalOpen: false,
            isGalleryModalOpen: false,
        }
        this.dropdown = this.dropdown.bind(this)
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleGalleryModal = this.toggleGalleryModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    toggleGalleryModal() {
        this.setState({
            isGalleryModalOpen: !this.state.isGalleryModalOpen,
        });
    }

    dropdown(e) {
        this.setState({selectGallery: e.target.value})
    }

    render() {
        return (
            <div className="my-collection-container">
                <div className='my-collection-header'>
                    <h1>MyCollection</h1>
                    <p>172 &nbsp; NFT's</p>
                </div>
                <div className='my-collection-row'>
                    <div className='my-collection-filter-container'>
                        <p style={{ fontWeight: '900', fontSize: '18px' }}>SORT BY:</p>
                        <select id="dropdown" onChange={this.dropdown} className='dropdown-button'>
                            <option value="" className="option-selected">New</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <br />
                        <br />
                        <p style={{ fontWeight: '900', fontSize: '18px'}}>GALLERIES:</p>
                        <p style={{fontSize:'24px', marginTop:'-15px'}}>Abstract</p>
                        <p style={{fontSize:'24px'}}>Nature</p>
                        <button onClick={this.toggleGalleryModal} className='add-button'>+ Add</button>
                    </div>


                     {/* Art Modal */}
                        {this.state.isModalOpen && (
                            <div className='my-collection-modal-bg'>
                            <div className='my-collection-modal-art-img-container'>
                                <img src={test1img } className='my-collection-modal-art-img' />
                            </div>
                            <div className='my-collection-modal-art-description-container'>
                                <span className='my-collection-modal-art-description-line1'><h3>Back Country Fishing</h3><button className='my-collection-modal-close-btn' onClick={this.toggleModal}>X</button></span>
                                <span className='my-collection-modal-art-description-line2'><h5 className='my-collection-modal-created'>Created by:</h5><h className='my-collection-modal-user'>Username</h></span>
                                <p className='my-collection-modal-art-description-line3'>Back Country Fishing was Inspired by my regular weekend trips to the mountains. 
                                Max, my dog, would love to sit by the fire as I cast my line to try and catch our dinner.</p>
                                <span className='my-collection-modal-art-description-line4'><p>Purchased For</p><p className='my-collection-modal-art-price'>55 ETH</p></span>
                                <span className='my-collection-modal-art-description-line5'><p>Owner #</p><p className='my-collection-modal-art-owner-count'>3</p><p className='my-collection-modal-art-trading-history'>View Trading History</p></span>
                                <Link to='/mystore'><button className='my-collection-sell-btn'>Sell</button></Link>
                            </div>
                        </div>
                        )}
                     {/* */}

                     {/* Gallery Modal */}
                        {this.state.isGalleryModalOpen && (
                            <div className='my-collection-modal-bg my-collection-gallery-modal '>
                                <h1 className='my-collection-gallery-modal-heading'>Enter Title</h1>
                                <span className='my-collection-gallery-modal-span'><input type='text' className='my-collection-gallery-input' placeholder='Search MyCollection' /><button className='my-collection-gallery-done-btn'>Done</button><button onClick={this.toggleGalleryModal} className='my-collection-gallery-cancel-btn'>Cancel</button></span>
                                <div className='my-collection-gallery-modal-art-container'>
                                    <div className='my-collection-gallery-modal-art-img-container'>
                                        <img src={test1img } />
                                    </div>
                                    <div className='my-collection-gallery-modal-art-img-container'>
                                        <img src={test2img } />
                                    </div>
                                    <div className='my-collection-gallery-modal-art-img-container'>
                                        <img src={test3img } />
                                    </div>
                                    <div className='my-collection-gallery-modal-art-img-container'>
                                        <img src={test4img } />
                                    </div>
                                </div>
                            </div>   
                        )}
                     {/* */}

                    <div className='my-collection-art-container'>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test1img } />
                        </button>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test2img } />
                        </button>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test3img } />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCollection1;