import React, { Component } from 'react';
import LogoImg from '../images/icon_color.png';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  InputGroup,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  setSearchValue,
  setSearchValueState,
} from '../redux/marketplace/actions';
import { Link, NavLink, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import helpIcon from '../assets/svg/help.svg';
import greenDot from '../assets/svg/green-dot.svg';
import checkmark1 from '../images/svg/Checkmark1.svg';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {
  CircularProgress,
  Grid,
  IconButton,
  Link as MLink,
  Menu,
  TextField,
} from '@material-ui/core';
import { LayoutContext } from '../state/Layout/context';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SignInModal from './SignInModal/SignInModal';
import Auth from './Auth';
import Identicon from 'identicon.js';
import Web3 from 'web3';
import './HeaderComponent.scss';
import dotenv from 'dotenv';

const env = dotenv.config();
let util;
let util1;

const profileMenuStyles = () => ({
  'MuiList-padding': {
    paddingTop: '0px',
  },
  profileMenu: {
    width: '170px',
    backgroundColor: '#FFFFFF',
    filter: 'dropshadow(0 0 4px #E7E7E7)',
  },
  changeMenu: {
    backgroundColor: '#FFFFFF',
    filter: 'dropshadow(0 0 4px #E7E7E7)',
    width: '200px',
  },
  text1: {
    backgroundColor: '#5540C7',
    '&:hover': {
      backgroundColor: '#5540C7',
      cursor: 'default',
    },
  },
  text2: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
      cursor: 'default',
    },
  },
  input: {
    border: '1px solid #F2F2F2',
    borderRadius: '15px',
    width: '175px',
    height: '25px',
    margin: '3% 0 0 -1.5%',
    padding: '0px',
    textIndent: '10px',
    fontSize: '13px',
    '&::placeholder': {
      fontSize: '10px',
      textIndent: '10px',
      lineHeight: '25px',
    },
  },
  successDialog: {
    borderRadius: '15px',
    width: '300px',
    height: '200px',
    border: '2px solid #9098FF',
  },
});

class Header extends Component {
  static contextType = LayoutContext;

  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      value: '',
      isLoggedIn: false,
      MyPropsAnchorEl: null,
      profileDropDownAnchorEl: null,
      profileMenuClasses: {},
      myReferralsAnchorEl: null,
      openNotifyDropDown: false,
      currentUser: {},
      changeUsernamePressed: false,
      changePasswordPressed: false,
      credentials: {},
      changePasswordButtonDisabled: true,
      changeUsernameSuccessDialogOpen: false,
      changePasswordSuccessDialogOpen: false,
      changePasswordErrorMessage: '',
      searchValue: '',
      skipLogo: true,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.getnewHash = this.getnewHash.bind(this);
    this.openWalletModal = this.openWalletModal.bind(this);
    this.inputFocus = this.inputFocus.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setSkipLogo = this.setSkipLogo.bind(this);
    this.handleNotifyDropDownClick = this.handleNotifyDropDownClick.bind(this);
    this.handleNotifyDropDownClickAway = this.handleNotifyDropDownClickAway.bind(
      this
    );
    this.handleClick = this.handleClick.bind(this);
    this.changeUsernameHandleClick = this.changeUsernameHandleClick.bind(this);
    this.changePasswordHandleClick = this.changePasswordHandleClick.bind(this);
    this.changeCredentialsHandleChanges = this.changeCredentialsHandleChanges.bind(
      this
    );
    this.changeUsernameOnSubmit = this.changeUsernameOnSubmit.bind(this);
    this.changePasswordOnSubmit = this.changePasswordOnSubmit.bind(this);
    this.getEmailLength = this.getEmailLength.bind(this);
    this.getIdenticon = this.getIdenticon.bind(this);
  }

  async componentDidMount() {
    Axios.defaults.headers = {
      Authorization: Auth.getToken(),
    };

    const { userId } = Auth.getToken();

    return Axios.post(`${process.env.REACT_APP_SW_API_URL}/user/get`, {
      userId: userId,
    })
      .then((res) => {
        this.setState({ currentUser: res.data.data });
        localStorage.setItem('userName', res.data.data.username);
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
    this.setSkipLogo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.isNavOpen !== this.state.isNavOpen){
      if(this.state.isNavOpen){
        document.body.style = "overflow-y: hidden"
      } else {
        document.body.style = "overflow-y: scroll"
      }
    }
  }

  setSkipLogo() {
    this.setState({skipLogo: !this.state.skipLogo})
  }

  getEmailLength(email) {
    let diff;
    if (email?.length < 15) {
      diff = 15 - email?.length;
      for (let i = 0; i < diff; i++) {
        email += 'x';
      }
    }
    console.log('email', email);
    return email;
  }

  getIdenticon() {
    let id = this.getEmailLength(Cookies.get('email')) ? this.getEmailLength(Cookies.get('email')).toString() : "x12345678901234";

    return `data:image/png;base64,${new Identicon(id,{
        foreground: [85, 64, 199, 255],
        background: [255, 255, 255, 255],
        margin: 0.2,
        size: 1080,
        format: 'png'
      }
    )}` ;
  }

  openWalletModal = () => {
    if (!this.state.account) {
      this.context.dispatch({
        type: 'TOGGLE_SIGN_IN_MODAL',
        payload: !this.context.state.signInModalIsOpen,
      });
    }
  };

  inputFocus = () => {
    const input = document.querySelectorAll('#input');
    return input?.forEach((field) => field.setAttribute('type', 'password'));
  };

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
    // console.log(x);
    //x= x.substring(1,10);
    return x;
  };
  signInIcon = () => {};

  handleClick = (event, type) => {
    switch (type) {
      case 0:
        this.setState({ myPropsAnchorEl: event.currentTarget });
        break;
      case 1:
        this.setState({ mySellingPropsAnchorEl: event.currentTarget });
        break;
      case 2:
        this.setState({ myMyWishlistAnchorEl: event.currentTarget });
        break;
      case 3:
        this.setState({ profileDropDownAnchorEl: event.currentTarget });
        break;
      case 4:
        this.setState({ myReferralsAnchorEl: event.currentTarget });
        break;
      default:
        break;
    }
  };
  handleClose = () => {
    this.setState({
      MyPropsAnchorEl: null,
      myReferralsAnchorEl: null,
      profileDropDownAnchorEl: null,
    });
  };

  handleSearchChange = (evt) => {
    const { value } = evt.target;
    this.setState({ searchValue: value });
  };

  handleSearchKeyPress = (event) => {
    if (event.keyCode === 13) {
      const { value } = event.target;
      this.props.setSearchValue({ searchValue: value });
    }
  };

  //change username/password Menu
  changeUsernameHandleClick = () => {
    this.setState({ changeUsernamePressed: !this.state.changeUsernamePressed });
  };

  changePasswordHandleClick = () => {
    this.setState({ changePasswordPressed: !this.state.changePasswordPressed });
  };

  changeCredentialsHandleChanges = (e) => {
    e.persist();
    const newCredentials = {
      ...this.state.credentials,
      [e.target.name]: e.target.value,
    };
    this.setState({ credentials: newCredentials });
    if (newCredentials.newPassword === newCredentials.confirmNewPassword) {
      this.setState({ changePasswordButtonDisabled: false });
    } else {
      this.setState({ changePasswordButtonDisabled: true });
    }
  };

  changeUsernameOnSubmit = (e) => {
    e.preventDefault();
    Axios.defaults.headers = {
      Authorization: Auth.getToken(),
    };
    const tk = Auth.getToken();
    const { userId, session } = tk;
    Axios.post(
      `${process.env.REACT_APP_SW_API_URL}/user/update/${userId}/${session}`,
      {
        username: this.state.credentials.newUsername,
      }
    )
      .then((response) => {
        this.setState({ changeUsernameSuccessDialogOpen: true });
        this.setState({ changeUsernamePressed: false });
        this.setState({
          newUsernameToDisplay: this.state.credentials.newUsername,
        });
        this.setState({
          credentials: {
            ...this.state.credentials,
            newUsername: this.state.credentials.newUsername,
          },
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  changePasswordOnSubmit = (e) => {
    e.preventDefault();
    Axios.defaults.headers = {
      Authorization: Auth.getToken(),
    };
    const tk = Auth.getToken();
    Axios.post(`${process.env.REACT_APP_SW_API_URL}/password/reset`, {
      authType: 'e',
      authId: this.state.currentUser.email,
      // currentPassword: this.state.credentials.currentPassword,
      // password: this.state.credentials.newPassword,
    })
      .then((response) => {
        if (response.data.status === 's') {
          this.setState({ changePasswordErrorMessage: '' });
          this.setState({ changePasswordSuccessDialogOpen: true });
          this.setState({ changePasswordPressed: false });
          this.setState({
            credentials: {
              ...this.state.credentials,
              newPassword: this.state.credentials.newPassword,
            },
          });
        } else {
          this.setState({
            changePasswordErrorMessage: 'Please use a correct current password',
          });
        }
      })
      .catch((error) => {
        // console.log('change password went to catch', error);
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
    const isMobile = window.innerWidth < 500;
    // console.log('this.state.currentUser', this.state.currentUser);
    return (
      <>
        {!isMobile ? (
          <Navbar light expand='md' className='navbarMain'>
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="navbarBrand">
              <NavLink to='/home'>
                <img
                  src={LogoImg}
                  alt='Logo Image'
                  id='logo-img'
                  className='imgLogo'
                />
              </NavLink>
            </NavbarBrand>
            {!window.location.href.includes('home') && (
              <>
                <InputGroup
                  style={{
                    position: 'relative',
                    width: '60%',
                  }}
                >
                  <Input
                    placeholder='Search'
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}
                    onKeyDown={this.handleSearchKeyPress}
                    style={{
                      padding: '0 2rem',
                      maxWidth: '400px',
                      width: '100%',
                      borderRadius: '20px',
                    }}
                  />
                </InputGroup>
              </>
            )}
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav
                navbar
                className='navCollapseItem'
              >
                <NavItem>
                  <NavLink className='navItemHeader' to='/allart'>
                    Marketplace
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className='navItemHeader' to='/allart'>
                    Help
                  </NavLink>
                </NavItem>

                {/* <NavItem>
                <NavLink className='nav-link' to='/home'>
                  Home
                </NavLink>
              </NavItem> */}

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
                  <div>
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
                            this.props.accounts
                              ? 'wallet-button'
                              : 'not-connected'
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
                                <Grid item>Wallet </Grid>
                                <Grid item>
                                  <img
                                    id='green-dot'
                                    style={{ width: '16px' }}
                                    src={checkmark1}
                                    alt=''
                                  />{' '}
                                </Grid>{' '}
                              </>
                            ) : (
                              <Grid item>Wallet</Grid>
                            )}
                          </Grid>
                        </Button>
                      </Grid>
                      <Grid item spacing={2}></Grid>
                    </Grid>
                  </div>
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
                        style={{ margin: '0.5rem' }}
                        className='Signinbutton-header'
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
                {Auth.getAuth() ? (
                  <Grid item spacing={2}>
                    <IconButton onClick={(e) => this.handleClick(e, 3)}>
                      <img
                        className='rounded-circle'
                        id='profile'
                        src={this.state.currentUser && this.state.currentUser.urlPhoto || this.getIdenticon()}
                        style={{
                          maxWidth: '30px',
                        }}
                        alt='My Profile Settings'
                      ></img>
                    </IconButton>
                    {this.state.changeUsernamePressed ? (
                      <Menu
                        classes={{
                          paper: this.state.profileMenuClasses.changeMenu,
                        }}
                        id='long-menu'
                        anchorEl={this.state.profileDropDownAnchorEl}
                        keepMounted
                        getContentAnchorEl={null}
                        open={this.state.profileDropDownAnchorEl}
                        onClose={this.handleClose}
                        PaperProps={{
                          style: {
                            padding: '10px',
                            width: '15%',
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
                          disableGutters
                          classes={{ root: this.state.profileMenuClasses.text2 }}
                        >
                          <div className="change-header">
                            <div
                              className="change-header-text"
                              onClick={this.changeUsernameHandleClick}
                            >
                              <ArrowBackIosIcon
                                color='action'
                                className="change-header-img"
                              />
                            </div>
                            <div className="change-header-text-user">
                              Change Username
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem
                          disableGutters
                          classes={{ root: this.state.profileMenuClasses.text2 }}
                        >
                          <div className="change-body">
                            <div className='change-body-user'>
                              Current Username
                            </div>
                            <div className="change-body-name">
                              {this.state.newUsernameToDisplay
                                ? this.state.newUsernameToDisplay
                                : this.state.currentUser.username}
                            </div>
                          </div>
                        </MenuItem>
                        <MenuItem
                          disableGutters
                          classes={{ root: this.state.profileMenuClasses.text2 }}
                        >
                          <div className="change-block-main">
                            <div className="change-block-main-user">
                              New Username
                            </div>
                            <div className="change-block-main-contain">
                              <Input
                                key='newUsernameInput'
                                id='newUsername'
                                type='text'
                                classes={{
                                  input: this.state.profileMenuClasses.input,
                                }}
                                className="input-change-username"
                                disableUnderline
                                placeholder='New Username'
                                name='newUsername'
                                value={this.state.credentials.newUsername}
                                onChange={this.changeCredentialsHandleChanges}
                              />
                            </div>
                            <Button
                              className="change-block-main-button-one"
                              onClick={this.changeUsernameOnSubmit}
                            >
                              CONFIRM
                            </Button>
                          </div>
                        </MenuItem>
                      </Menu>
                    ) : null}

                    {this.state.changePasswordPressed ? (
                      <Menu
                        classes={{
                          paper: this.state.profileMenuClasses.changeMenu,
                        }}
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
                            // padding: '1px',
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
                          disableGutters
                          classes={{ root: this.state.profileMenuClasses.text2 }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottom: '1px solid #F2F2F2',
                              minWidth: '100%',
                              maxHeight: '10px',
                              padding: '10px 0px 20px 15px',
                            }}
                          >
                            <div
                              style={{
                                cursor: 'pointer',
                                width: '20%',
                                maxHeight: '10px',
                                transform: 'scale(.7, .7)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '-8%',
                              }}
                              onClick={this.changePasswordHandleClick}
                            >
                              <ArrowBackIosIcon fontSize='small' color='action' />
                            </div>
                            <p
                              style={{
                                width: '80%',
                                maxHeight: '10px',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '11px',
                                marginBottom: '8%',
                              }}
                            >
                              &#8288;Change Password
                            </p>
                          </div>
                        </MenuItem>
                        <MenuItem
                          disableGutters
                          classes={{ root: this.state.profileMenuClasses.text2 }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'space-evenly',
                              minWidth: '100%',
                              whiteSpace: 'pre-line',
                            }}
                          >
                            <p
                              style={{
                                color: '#888888',
                                fontSize: '11px',
                                margin: '0 0 0 5%',
                                maxHeight: '10px',
                              }}
                            >
                              &#8288;Current Password
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 0 5% 0',
                              }}
                            >
                              <Input
                                key='currentPasswordInput'
                                id='input'
                                type='text'
                                classes={{
                                  input: this.state.profileMenuClasses.input,
                                }}
                                disableUnderline
                                value={this.state.credentials.currentPassword}
                                placeholder='Current Password'
                                name='currentPassword'
                                onChange={this.changeCredentialsHandleChanges}
                                autoComplete='off'
                                onFocus={this.inputFocus}
                              />
                            </div>
                            {this.state.changePasswordErrorMessage ? (
                              <div
                                style={{
                                  color: 'red',
                                  fontSize: '10px',
                                  marginLeft: '5%',
                                  marginTop: '-5%',
                                }}
                              >
                                {this.state.changePasswordErrorMessage}
                              </div>
                            ) : null}
                            <label
                              style={{
                                color: '#888888',
                                fontSize: '11px',
                                margin: '0 0 0 5%',
                                maxHeight: '10px',
                              }}
                            >
                              &#8288;New Password
                            </label>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 0 5% 0',
                              }}
                            >
                              <Input
                                key='newPasswordInput'
                                id='input'
                                type='text'
                                classes={{
                                  input: this.state.profileMenuClasses.input,
                                }}
                                disableUnderline
                                placeholder='New Password'
                                name='newPassword'
                                value={this.state.credentials.newPassword}
                                onChange={this.changeCredentialsHandleChanges}
                                autoComplete='off'
                                onFocus={this.inputFocus}
                              />
                            </div>
                            <p
                              style={{
                                color: '#888888',
                                fontSize: '11px',
                                margin: '0 0 0 5%',
                                maxHeight: '10px',
                              }}
                            >
                              &#8288;Confirm New Password
                            </p>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Input
                                key='confirmNewPasswordInput'
                                id='input'
                                type='text'
                                classes={{
                                  input: this.state.profileMenuClasses.input,
                                }}
                                disableUnderline
                                placeholder='Confirm Password'
                                name='confirmNewPassword'
                                value={this.state.credentials.confirmNewPassword}
                                onChange={this.changeCredentialsHandleChanges}
                                autoComplete='off'
                                onFocus={this.inputFocus}
                              />
                            </div>
                            <Button
                              style={
                                !this.state.changePasswordButtonDisabled
                                  ? {
                                    width: '100px',
                                    height: '26px',
                                    margin: '7% 0 0 5%',
                                    borderRadius: '15px',
                                    fontSize: '11px',
                                    backgroundColor: '#5540C7',
                                    color: '#FFFFFF',
                                  }
                                  : {
                                    width: '100px',
                                    height: '26px',
                                    margin: '7% 0 0 5%',
                                    borderRadius: '15px',
                                    fontSize: '11px',
                                    backgroundColor: '#5540C7',
                                    color: '#FFFFFF',
                                    opacity: '35%',
                                  }
                              }
                              onClick={this.changePasswordOnSubmit}
                              disabled={this.state.changePasswordButtonDisabled}
                            >
                              CONFIRM
                            </Button>
                          </div>
                        </MenuItem>
                      </Menu>
                    ) : null}

                    <Menu
                      classes={{
                        paper: this.state.profileMenuClasses.profileMenu,
                        list: this.state.profileMenuClasses['MuiList-padding'],
                      }}
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
                          // padding: '1px',
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
                        disableGutters
                        classes={{ root: this.state.profileMenuClasses.text1 }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '50px',
                            justifyContent: 'center',
                            marginLeft: '10px',
                            padding: '10px 3px 5px 3px',
                          }}
                        >
                          <li
                            style={{
                              fontFamily: 'Gibson',
                              fontSize: '15px',
                              fontWeight: 600,
                              color: 'gray',
                            }}
                          >
                            Hello,
                            {this.state.credentials.newUsername
                              ? this.state.credentials.newUsername
                              : this.state.currentUser.username}
                          </li>
                        </div>
                      </MenuItem>

                      <NavLink
                        style={{
                          color: 'gray',
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          textDecoration: 'none',
                          // marginLeft: '-0.2rem',
                          // marginBottom: '0.75rem',
                        }}
                        to={'/myprofile'}
                      >
                        <MenuItem disableGutters>
                        <span
                          style={{
                            display: 'flex',
                            maxHeight: '10px',
                            alignItems: 'center',
                            whiteSpace: 'pre-line',
                            marginLeft: '10px',
                            padding: '10px 3px 5px 3px',
                          }}
                        >
                          <p
                            style={{
                              flex: '1',
                              color: '#888888',
                              fontFamily: 'Gibson',
                              fontSize: '13px',
                              margin: '5px 0',
                            }}
                          >
                            MyProfile
                          </p>
                        </span>
                        </MenuItem>
                      </NavLink>

                      <NavLink
                        style={{
                          color: 'gray',
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          textDecoration: 'none',
                          // marginLeft: '-0.2rem',
                          // marginBottom: '0.75rem',
                        }}
                        to='/mycollection'
                      >
                        <MenuItem disableGutters>
                        <span
                          style={{
                            display: 'flex',
                            maxHeight: '10px',
                            alignItems: 'center',
                            whiteSpace: 'pre-line',
                            marginLeft: '10px',
                            padding: '10px 3px 5px 3px',
                          }}
                        >
                          <p
                            style={{
                              flex: '1',
                              color: '#888888',
                              fontFamily: 'Gibson',
                              fontSize: '13px',
                              margin: '5px 0',
                            }}
                          >
                            MyCollection
                          </p>
                        </span>
                        </MenuItem>
                      </NavLink>
                      <NavLink
                        style={{
                          color: 'gray',
                          fontFamily: 'Gibson',
                          fontSize: '13px',
                          textDecoration: 'none',
                        }}
                        to='/mystore'
                      >
                        <MenuItem disableGutters>
                        <span
                          style={{
                            display: 'flex',
                            maxHeight: '10px',
                            alignItems: 'center',
                            whiteSpace: 'pre-line',
                            marginLeft: '10px',
                            padding: '10px 3px 5px 3px',
                          }}
                        >
                          <p
                            style={{
                              flex: '1',
                              color: '#888888',
                              fontFamily: 'Gibson',
                              fontSize: '13px',
                              margin: '5px 0',
                            }}
                          >
                            MyStore
                          </p>
                        </span>
                        </MenuItem>
                      </NavLink>

                      <MenuItem
                        onClick={this.changeUsernameHandleClick}
                        disableGutters
                      >
                      <span
                        style={{
                          display: 'flex',
                          maxHeight: '10px',
                          alignItems: 'center',
                          whiteSpace: 'pre-line',
                          marginLeft: '10px',
                          padding: '10px 3px 5px 3px',
                        }}
                      >
                        <p
                          style={{
                            flex: '1',
                            color: '#888888',
                            fontFamily: 'Gibson',
                            fontSize: '13px',
                            margin: '5px 0',
                          }}
                        >
                          Change Username
                        </p>
                      </span>
                      </MenuItem>
                      {/* <MenuItem
                      onClick={this.changePasswordHandleClick}
                      disableGutters
                    >
                      <span
                        style={{
                          display: 'flex',
                          maxHeight: '10px',
                          alignItems: 'center',
                          whiteSpace: 'pre-line',
                          marginLeft: '10px',
                          padding: '10px 3px 5px 3px',
                        }}
                      >
                        <p
                          style={{
                            flex: '1',
                            color: '#888888',
                            fontFamily: 'Gibson',
                            fontSize: '13px',
                            margin: '5px 0',
                          }}
                        >
                          Change password
                        </p>
                      </span>
                    </MenuItem> */}

                      {/* <MenuItem
                      onClick={() => console.log('change password clicked')}
                      disableGutters
                    >
                      <span
                        style={{
                          display: 'flex',
                          maxHeight: '10px',
                          alignItems: 'center',
                          whiteSpace: 'pre-line',
                          marginLeft: '10px',
                          padding: '10px 3px 5px 3px',
                        }}
                      >
                        <p
                          style={{
                            flex: '1',
                            color: '#888888',
                            fontFamily: 'Gibson',
                            fontSize: '13px',
                            margin: '5px 0',
                          }}
                        >
                          Change Password
                        </p>
                      </span>
                    </MenuItem> */}

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
                              // console.log(_e);
                            });
                          Auth.logout();
                          this.handleClose();
                          window.location.reload();
                        }}
                      >
                      <span
                        style={{
                          display: 'flex',
                          maxHeight: '23px',
                          alignItems: 'center',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        <p
                          style={{
                            marginTop: '1.5rem',
                            marginLeft: '-0.12rem',
                            marginBottom: '1rem',
                            flex: '1',
                            color: '#5540c7',
                            fontFamily: 'Gibson',
                            fontSize: '13px',
                          }}
                        >
                          Log Out
                        </p>
                      </span>
                      </MenuItem>
                    </Menu>
                  </Grid>
                ) : (
                  <div></div>
                )}
                {/* <NavItem>
                <NavLink className='nav-link' to='/mycreations'>
                  <img
                    width='30px'
                    height='30px'
                    className='rounded-circle'
                    id='profile'
                    src={`data:image/png;base64,${new Identicon(
                      new Date().toString()
                    )}`}
                    alt='profile'
                  />
                </NavLink>
              </NavItem>  */}
                {/* <NavItem>
                <NavLink className='nav-link' to='#'>
                  <img
                    width='30px'
                    height='30px'
                    className='rounded-circle'
                    src={helpIcon}
                    alt='question-mark'
                  />
                </NavLink>
              </NavItem> */}
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
        ) : (
          <Navbar light expand='md' className='navbarMain'>
            <NavbarBrand className="navbarBrand">
              {this.state.skipLogo ? (
                <NavLink to='/home'>
                  <img
                    src={LogoImg}
                    alt='Logo Image'
                    id='logo-img'
                    className='imgLogo'
                  />
                </NavLink>
              ) : null }

            </NavbarBrand>
            <NavbarToggler
              onClick={this.toggleNav}
              className={`${this.state.isNavOpen === true ? 'togle_nav_img' : ''}`}
            />
            {!window.location.href.includes('home') && (
              <>
                <InputGroup
                  style={{
                    position: 'relative',
                    width: '60%',
                  }}
                >
                  <Input
                    placeholder='Search'
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}
                    onKeyDown={this.handleSearchKeyPress}
                    style={{
                      padding: '0 2rem',
                      maxWidth: '400px',
                      width: '100%',
                      borderRadius: '20px',
                    }}
                  />
                </InputGroup>
              </>
            )}
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav
                navbar
                className='navCollapseItem'
              >
                {Auth.getAuth() ?
                  (
                    <NavItem className='navItemHeaderUserName'>
                      {`@${this.state.credentials.newUsername
                        ? this.state.credentials.newUsername
                        : this.state.currentUser.username}`}
                    </NavItem>
                  )
                  : (
                    <NavItem className='navItemHeaderUserName'>
                      <div
                        onClick={() =>
                          this.context.dispatch({
                            type: 'TOGGLE_SIGN_IN_MODAL',
                            payload: !this.context.state.signInModalIsOpen,
                          })
                        }
                      >
                        Sign In
                      </div>
                    </NavItem>
                  )
                }
                <NavItem>
                  <NavLink className='navItemHeader' to='/allart'>
                    Marketplace
                  </NavLink>
                </NavItem>
                {Auth.getAuth() ? (
                  <>
                    <NavItem>
                      <NavLink className='navItemHeader' to='/myprofile'>
                        MyProfile
                      </NavLink>
                    </NavItem>
                  <NavItem>
                    <NavLink className='navItemHeader' to='/mycollection'>
                      MyCollection
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className='navItemHeader' to='/mystore'>
                      MyStore
                    </NavLink>
                  </NavItem>
                  </>
                  )
                  : (
                    <div/>
                  )
                }
                <NavItem>
                  <NavLink className='navItemHeader' to='/allart'>
                    Help
                  </NavLink>
                </NavItem>
                {Auth.getAuth() ? (
                <MenuItem
                  className='navItemHeaderUserName'
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
                        // console.log(_e);
                      });
                    Auth.logout();
                    this.handleClose();
                    window.location.reload();
                  }}
                >
                  <div>
                    Log Out
                  </div>
                </MenuItem>
                  ) : (
                    <div/>
                )}
                <SignInModal initContracts={this.props.initContracts} />
              </Nav>
            </Collapse>
          </Navbar>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  searchValue: state.marketplace.searchValue,
  searchValueState: state.marketplace.searchValueState,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchValue: (data) => dispatch(setSearchValue(data)),
  setSearchValueState: (data) => dispatch(setSearchValueState(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
