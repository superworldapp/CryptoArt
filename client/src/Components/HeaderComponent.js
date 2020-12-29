import React, { Component } from 'react';
import LogoImg from '../images/logo.svg';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    Collapse,
    NavItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import Web3 from 'web3';
let util;
let util1;

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { isNavOpen: false, value: '', isLoggedIn: false };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }
    conver = async (x) => {
        util = Web3.utils.toWei(x, 'milli');
    };
    converb = async (x) => {
        util1 = Web3.utils.fromWei(x, 'milli');
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    loggedInOrLoggedOut = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
    };

    signInIcon = () => {};

    render() {
        // if (this.props.registered == 1 || this.props.registered == 2) {
        //     return(
        //     <React.Fragment>
        //         <Navbar dark expand="md">
        //             <div className="container justify-center">

        //                 <NavbarToggler onClick={this.toggleNav}/>
        //                 <NavbarBrand className="mr-auto" >BrimNet</NavbarBrand>
        //                 <Collapse isOpen = {this.state.isNavOpen} navbar>

        //                     <Nav navbar className="m-auto">

        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/home">Home</NavLink>
        //                     </NavItem>
        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/items">Items</NavLink>
        //                     </NavItem>
        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/shipment">Shipments</NavLink>
        //                     </NavItem>
        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/register">Register</NavLink>
        //                     </NavItem>

        //                     </Nav>

        //                 </Collapse>
        //             </div>
        //             <h6 style={{ color: "white"}}>Balance : {util1}</h6>
        //         </Navbar>

        //     </React.Fragment>
        //     );
        // }
        // else if (this.props.registered == 3 || this.props.registered == 4) {
        //     return(
        //     <React.Fragment>
        //         <Navbar dark expand="md">
        //             <div className="container justify-center">

        //                 <NavbarToggler onClick={this.toggleNav}/>
        //                 <NavbarBrand className="mr-auto" >BrimNet</NavbarBrand>
        //                 <Collapse isOpen = {this.state.isNavOpen} navbar>

        //                     <Nav navbar className="m-auto">

        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/home">Home</NavLink>
        //                     </NavItem>

        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/register">Register</NavLink>
        //                     </NavItem>

        //                     </Nav>

        //                 </Collapse>
        //             </div>
        //             <h6 style={{ color: "white"}}>Balance : {util1}</h6>
        //         </Navbar>
        //     </React.Fragment>
        //     );
        // }
        // else if (this.props.registered == 5) {
        //     return(
        //         <React.Fragment>
        //         <Navbar dark expand="md">
        //             <div className="container justify-center">

        //                 <NavbarToggler onClick={this.toggleNav}/>
        //                 <NavbarBrand className="mr-auto" >BrimNet</NavbarBrand>
        //                 <Collapse isOpen = {this.state.isNavOpen} navbar>

        //                     <Nav navbar className="m-auto">

        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/home">Home</NavLink>
        //                     </NavItem>
        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/items">Items</NavLink>
        //                     </NavItem>
        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/shipment">Shipments</NavLink>
        //                     </NavItem>
        //                     <NavItem>
        //                         <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/allmem">All Members</NavLink>
        //                     </NavItem>

        //                     </Nav>

        //                 </Collapse>
        //             </div>
        //             <h6 style={{ color: "white"}}>Balance : {util1}</h6>
        //         </Navbar>

        //     </React.Fragment>
        //     );
        // }
        return (
            <>
                <Navbar
                    light
                    expand='md'
                    style={{
                        marginBottom: '-1.8rem'
                    }}>
                    
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className='mr-auto'>
                            <img src={LogoImg} alt='Logo Image' height='60' width='60'/>
                        </NavbarBrand>
                        <InputGroup
                            style={{
                                position: 'relative',
                                marginLeft: '2rem'
                            }}>
                            <Input
                                placeholder='Search for Artist, Art name'
                                value={this.state.value}
                                onChange={this.handleChange}
                                style={{
                                    padding: '0 2rem',
                                    maxWidth: '400px',
                                    borderRadius: '20px'
                                }}
                            />
                            <i
                                class='fas fa-search'
                                style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '25%',
                                    color: '#ccc',
                                    display: !this.state.value
                                        ? 'block'
                                        : 'none'
                                }}></i>
                        </InputGroup>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav
                                navbar
                                className='m-auto d-flex align-items-center justify-content-end'>
                                <NavItem>
                                    <NavLink
                                        className='nav-link'
                                        
                                        to='/home'>
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className='nav-link'
                                        style={{
                                            width: 200
                                        }}
                                        to='/allart'>
                                        Art Marketplace
                                    </NavLink>
                                </NavItem>
                                {this.state.isLoggedIn ? (
                                    <NavItem>
                                        <NavLink className='nav-link' to='/myart'>
                                            <i
                                                onClick={
                                                    this.loggedInOrLoggedOut
                                                }
                                                class='fas fa-user-circle fa-2x'
                                                style={{
                                                    color: '#5540C7',
                                                    cursor: 'pointer'
                                                }}></i>
                                        </NavLink>
                                    </NavItem>
                                ) : (
                                    <NavItem>
                                        <button
                                            className='align-center justify-center btn sign-in-btn'
                                            onClick={this.loggedInOrLoggedOut}
                                            style={{
                                                color: '#fff',
                                                width: 150,
                                                borderRadius: '30px'
                                            }}>
                                            Sign In
                                        </button>
                                    </NavItem>
                                )}
                            </Nav>
                        </Collapse>
                   
                    {/* <h6
                        style={{
                            fontWeight: 800
                        }}>
                        <small>{this.props.accounts}</small>
                        <br />
                        <small>
                            Balance :{' '}
                            {Web3.utils.fromWei(
                                this.props.balance.toString(),
                                'ether'
                            )}
                        </small>
                    </h6> */}
                </Navbar>
                <div
                    style={{
                        textAlign: 'left',
                        height: '20%',
                        fontSize: '.8rem',
                        marginLeft: '150px',
                        textDecoration: 'underline'
                    }}>
                    <Link
                        to='#'
                        style={{
                            color: '#ccc',
                            margin: '0 1rem',
                            cursor: 'pointer'
                        }}>
                        Caozhibing
                    </Link>
                    <Link
                        to='#'
                        style={{
                            color: '#ccc',
                            margin: '0 1rem',
                            cursor: 'pointer'
                        }}>
                        Northern Lights
                    </Link>
                    <Link
                        to='#'
                        style={{
                            color: '#ccc',
                            margin: '0 1rem',
                            cursor: 'pointer'
                        }}>
                        Winter Jacket
                    </Link>
                </div>
            </>
        );
    }
}

export default Header;
