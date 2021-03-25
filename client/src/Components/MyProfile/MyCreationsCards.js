import React, { Component } from 'react';
import './MyCreationsCards.css';
import CreationCards from './CreationCards'
class MyCreationCards extends Component {
    constructor(props) {
       super(props);
     }
    multipleElements = () => {
      let mycreations = [];
      for(let i = 0; i < 12; i++){
        mycreations.push(<CreationCards className = "item"/>)
      }
      return mycreations
    }
    // separateElement () { 
    //   var separateElements = [];
    //   var multiElements = this.multipleElements();
     
    //  for(var i = 0; i < multiElements.length; i+=4) {
    //       var oneRow = [];
    //       oneRow.push(multiElements.slice(i, i+4).map(item => {
    //     return <div style={{display: 'inline-block'}}>{item}</div>
    //  }))
    //  separateElements.push(oneRow.map(itm => {return <div>{itm}</div>}))
    //  }
    //  return separateElements;
    //  }
    render(){     
      return (
        <div className = "creation">
          {this.multipleElements()}
        </div>
      )
    }
}

export default MyCreationCards
