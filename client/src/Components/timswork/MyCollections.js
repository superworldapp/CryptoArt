import React, { Component } from 'react';
import './MyCollections.css'
import { Link } from 'react-router-dom';
import {Row, Col, Modal} from 'reactstrap'
import test1img from '../../images/image 25.png'
import test2img from '../../images/image 11.png'
import test3img from '../../images/Nate3.jpg'
import test4img from '../../images/image 8.png'


class MyCollection1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGallery: '',
            isModalOpen: false,
        }
        this.dropdown = this.dropdown.bind(this)
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
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
                        <a href='http://www.google.com' className='add-button'>+ Add</a>
                    </div>

                    <Modal
                        isOpen={this.state.isModalOpen}
                        toggle={this.toggleModal}
                        className='modal-box'
                     >
                         <div className='modal-container'>
                            <img src={test1img } className='model-img' />
                             <div className='model-text-container'>
                                 <h3>Back Country Fishing</h3>
                                 <h4>Created by: <span>Username</span></h4>
                                 <h5>Back Country Fishing was Inspired by my regular weekend trips to the mountains. 
                                 Max, my dog, would love to sit by the fire as I cast my line to try and catch our dinner.</h5>
                                 <div className='model-price-info'>
                                    <span><p>Purchased For</p><p>55ETH</p></span>
                                    <span><p>Owner #</p><p>3</p><a href='http://www.google.com'>View trading history</a></span>
                                   <Link to='/mystore'><button className='model-sell-btn'>Sell</button></Link>
                                 </div>
                             </div>
                         </div>
                     </Modal>

                    <div className='my-collection-art-container col-4 col-md-3'>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test1img } />
                        </button>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test2img } />
                        </button>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test3img } />
                        </button>
                        <button onClick={this.toggleModal} className='my-collection-art-img-box'>
                            <img src={test4img } />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCollection1;