import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import '../App.css'
import { Container, Row, Col,Card,CardImg} from 'reactstrap';
import axios from 'axios';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFile : null
        }
    }

    
   
    render(){
      
      return(
        <React.Fragment >
          
                <div className="bg">
                    <Container>
                    
                    <h2>Welcome to CryptoArt</h2>
                    </Container>
                </div>
                
                
        
        </React.Fragment>
        );
      
    }

}

export default Home;