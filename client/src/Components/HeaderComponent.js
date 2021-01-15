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
  Input,
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import helpIcon from '../assets/svg/help.svg';
import greenDot from '../assets/svg/green-dot.svg';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import {
  CircularProgress,
  Grid,
  IconButton,
  Link as MLink,
  Menu,
  TextField,
} from '@material-ui/core';
import { LayoutContext } from '../state/Layout/context';
import SignInModal from './SignInModal/SignInModal';
import Auth from './Auth';
import Identicon from 'identicon.js';
import Web3 from 'web3';
import './HeaderComponent.css';
import dotenv from 'dotenv';
const env = dotenv.config();
let util;
let util1;

class Header extends Component {
  static contextType = LayoutContext;

  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      value: '',
      isLoggedIn: false,
      MyPropsAnchorEl: null,
      myReferralsAnchorEl: null,
      openNotifyDropDown: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.getnewHash = this.getnewHash.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.openWalletModal = this.openWalletModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNotifyDropDownClick = this.handleNotifyDropDownClick.bind(this);
    this.handleNotifyDropDownClickAway = this.handleNotifyDropDownClickAway.bind(
      this
    );
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleSignIn() {
    this.context.dispatch({
      type: 'TOGGLE_SIGN_IN_MODAL',
      payload: !this.context.state.signInModalIsOpen,
    });
  }

  openWalletModal = () => {
    if (!this.state.account) {
      this.context.dispatch({
        type: 'TOGGLE_SIGN_IN_MODAL',
        payload: !this.context.state.signInModalIsOpen,
      });
    }
  };
  // loggedInOrLoggedOut = () => {
  //   this.setState({ isLoggedIn: !this.state.isLoggedIn });
  // };

  conver = async (x) => {
    util = Web3.utils.toWei(x, 'milli');
  };
  converb = async (x) => {
    util1 = Web3.utils.fromWei(x, 'milli');
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  getnewHash = async () => {
    let x = 1;
    console.log(x);
    //x= x.substring(1,10);
    return x;
  };
  signInIcon = () => {};

  handleClose = () => {
    this.setState({
      MyPropsAnchorEl: null,
      myReferralsAnchorEl: null,
      profileDropDownAnchorEl: null,
    });
  };

  //Open Notification menu dropdown
  handleNotifyDropDownClick = () => {
    this.setState({ openNotifyDropDown: !this.state.openNotifyDropDown });
  };

  handleNotifyDropDownClickAway = () => {
    this.setState({ openNotifyDropDown: false });
  };

  render() {
    return (
      <>
        <Navbar
          light
          expand='md'
          style={{
            marginBottom: '-1.8rem',
          }}
        >
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand className='mr-auto'>
            <NavLink to='/home'>
              <img src={LogoImg} alt='Logo Image' height='60' width='60' />
            </NavLink>
          </NavbarBrand>
          <InputGroup
            style={{
              position: 'relative',
              marginLeft: '2rem',
            }}
          >
            <Input
              placeholder='Search for Artist, Art name'
              value={this.state.value}
              onChange={this.handleChange}
              style={{
                padding: '0 2rem',
                maxWidth: '400px',
                borderRadius: '20px',
              }}
            />
            <i
              class='fas fa-search'
              style={{
                position: 'absolute',
                left: '10px',
                top: '25%',
                color: '#ccc',
                display: !this.state.value ? 'block' : 'none',
              }}
            ></i>
          </InputGroup>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav
              navbar
              className='m-auto d-flex align-items-center justify-content-end'
            >
              {/* <NavItem>
                <NavLink className='nav-link' to='/home'>
                  Home
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  className='nav-link'
                  style={{
                    width: 200,
                  }}
                  to='/allart'
                >
                  Art Marketplace
                </NavLink>
              </NavItem>

              {/* <NavItem>
                <NavLink className='nav-link' to='/myart'>
                  <i
                    style={{
                      color: '#5540C7',
                      cursor: 'pointer',
                    }}
                  ></i>
                  My Collections
                </NavLink>
              </NavItem> */}

              {Auth.getAuth() ? (
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      className={
                        this.props.accounts ? 'wallet-button' : 'not-connected'
                      }
                      disabled={false}
                      onClick={this.openWalletModal}
                    >
                      <Grid
                        container
                        direction='row'
                        justify='space-around'
                        alignItems='center'
                      >
                        {this.props.accounts ? (
                          <>
                            <Grid item>Wallet Connected</Grid>
                            <Grid item>
                              <img
                                style={{ width: '10px' }}
                                src={greenDot}
                                alt=''
                              />{' '}
                            </Grid>{' '}
                          </>
                        ) : (
                          <Grid item>Connect Wallet</Grid>
                        )}
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid item spacing={2}></Grid>
                  <Grid item spacing={2}>
                    <Menu
                      id='long-menu'
                      anchorEl={this.state.profileDropDownAnchorEl}
                      keepMounted
                      getContentAnchorEl={null}
                      open={this.state.profileDropDownAnchorEl}
                      onClose={this.handleClose}
                      PaperProps={{
                        style: {
                          // maxHeight: ITEM_HEIGHT * 4.5,
                          // width: '300px',
                          padding: '1px',
                        },
                      }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          Axios.defaults.headers = {
                            Authorization: Auth.getToken(),
                          };
                          Axios.post(
                            `${process.env.REACT_APP_API_URL}/user/logout`
                          )
                            .then(() => {
                              // console.log('LOGGED OUT');
                            })
                            .catch((_e) => {
                              // console.log('LOGGED OUT ERROR');
                              console.log(_e);
                            });
                          Auth.logout();
                          this.handleClose();
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            maxHeight: '10px',
                            alignItems: 'center',
                            whiteSpace: 'pre-line',
                          }}
                        >
                          <p
                            style={{
                              flex: '1',
                              color: '#5540c7',
                              fontFamily: 'Gibson',
                              fontSize: '11px',
                            }}
                          >
                            Log Out
                          </p>
                        </span>
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                  spacing={2}
                >
                  <Grid item spacing={2}>
                    <Button
                      className='LoginButton-header'
                      onClick={() =>
                        this.context.dispatch({
                          type: 'TOGGLE_SIGN_IN_MODAL',
                          payload: !this.context.state.signInModalIsOpen,
                        })
                      }
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              )}

              <NavItem></NavItem>
              <NavItem>
                <NavLink className='nav-link' to='/myart'>
                  <img
                    width='38px'
                    height='38px'
                    className='rounded-circle'
                    src={`data:image/png;base64,${new Identicon(
                      new Date().toString()
                    )}`}
                    alt='profile'
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link' to='#'>
                  <img
                    width='24px'
                    className='rounded-circle'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png'
                    alt='question-mark'
                  />
                </NavLink>
              </NavItem>
              <SignInModal initContracts={this.props.initContracts} />
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
      </>
    );
  }
}

export default Header;
