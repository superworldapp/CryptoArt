import React, { Component } from 'react';
import './MyCollections.css'

class MyCollection1 extends Component {
    render() {
        return (
            <div className="my-collection-container">
                <div className='my-collection-header'>
                    <h1>MyCollection</h1>
                    <p>172 &nbsp; NFT's</p>
                </div>
            </div>
        )
    }
}

export default MyCollection1;