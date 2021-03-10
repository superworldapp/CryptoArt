import React, { Component } from 'react';
import './MyCollections.css'
import {Row, Col} from 'reactstrap'
import test1img from '../../images/image 25.png'
import test2img from '../../images/image 11.png'
import test3img from '../../images/Nate3.jpg'
import test4img from '../../images/image 8.png'


class MyCollection1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGallery: '',
        }
        this.dropdown = this.dropdown.bind(this)
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
                    <div className='my-collection-art-container col-4 col-md-3'>
                        <div className='my-collection-art-img-box'>
                            <img src={test1img } />
                        </div>
                        <div className='my-collection-art-img-box'>
                            <img src={test2img } />
                        </div>
                        <div className='my-collection-art-img-box'>
                            <img src={test3img } />
                        </div>
                        <div className='my-collection-art-img-box'>
                            <img src={test4img } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCollection1;