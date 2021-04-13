import React, { useState, useEffect } from 'react';
import { Tabs, Tab, withStyles } from '@material-ui/core';
import { RiTwitterLine, RiInstagramLine, RiGlobalLine } from 'react-icons/ri';
import { FiFacebook, FiYoutube, FiUpload, FiMail } from 'react-icons/fi';
import MyCreation from './Tabs/MyCreationsCards';
import MyCollectionsCards from './Tabs/MyCollectionsCards';
import RecentActivity from './Tabs/RecentActivityPage';
import ModalEditProfile from './Modal/ModalEditProfile';
import Auth from '../Auth';
import Axios from 'axios';
import coverImage from '../../images/profileBg.jpg';
import profileImage from '../../images/svg/profile-image.svg';
import successLogo from '../../images/svg/successLogo.svg';
import pencil from '../../images/pencil.png';
import './MyProfileComponent.scss';
import SocialShare from './SocialShare';
import Identicon from 'identicon.js';
import Cookies from 'js-cookie';

const MyProfileComponent = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [linksStore, setLinksStore] = useState();
  const [currentUser, setCurrentUser] = useState();
  const setLinksState = (e) => {
    setLinksStore(e);
  };

  const getUser = () => {
    let auth = Auth.getToken();
    if (!auth || !auth.userId) {
      return;
    }
    Axios.post(`${process.env.REACT_APP_SW_API_URL}/user/get/`, {
      userId: auth.userId,
    }).then((res) => {
      if (res.data && res.data.r == 's' && res.data.data) {
        setCurrentUser(res.data.data);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getEmailLength = (email) => {
    let diff;
    if (email.length < 15) {
      diff = 15 - email.length;
      for (let i = 0; i < diff; i++) {
        email += 'x';
      }
    }
    console.log('email', email);
    return email;
  };

  const getIdenticon = () => {
    return `data:image/png;base64,${new Identicon(
      getEmailLength(Cookies.get('email')).toString(),{
        foreground: [85, 64, 199, 255],               
        background: [255, 255, 255, 255],        
        margin: 0.2,                              
        size: 1080,                                
        format: 'png'                             
      }
    )}`;
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleEdit = () => {
    if (isEdit) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }

    setIsEdit(!isEdit);
  };

  const StyledTab = withStyles({
    root: {
      color: '#000',
      fontSize: '30px',
      textTransform: 'none',
      lineHeight: '30px',
      marginRight: '100px',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: ['gibson'],
      fontStyle: 'normal',
    },
  })((props) => <Tab indicatorColor='black' {...props} />);

  const StyledTabs = withStyles({
    root: {
      justifyContent: 'space-between',
      margin: '0 auto',
    },
    scroller: {
      overflowX: 'scroll !important',
      '&::-webkit-scrollbar': {
        width: 0,
      },
      '-ms-overflow-style': 'none',
      overflow: '-moz-scrollbars-none',
    },
    flexContainer: {
      justifyContent: 'space-between',
      margin: '0 auto',
      maxWidth: '800px',
      width: '100%',
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#000',
      height: 5,
    },
  })((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  return (
    <>
      <div className='profile-info'>
        {isEdit ? (
          <ModalEditProfile setLinksState={setLinksState} isEdit={handleEdit} />
        ) : null}
        <div className='cover-container'>
          <img src={coverImage} alt='cover-img' />
        </div>
        <div className='exampl'>
          <div className='user-container'>
            <img className='user-img' src={currentUser && currentUser.urlPhoto || getIdenticon()} alt='user-img' />
            <div className={'user-img-hover'}>
              <div className='edit'>Edit</div>
              <div className='upload'>Upload</div>
            </div>
          </div>
          <p className='user-name'>
            {currentUser !== undefined ? '@' + currentUser.username : '...'}
            <img src={successLogo} alt='logo' />
          </p>
          <div className='name_block_creator'>
            <p className='creator-name'>
              {currentUser !== undefined ? currentUser.name : 'Anonymous'}
              <img src={pencil} alt='pencil' id='pencil' onClick={handleEdit} />
            </p>
          </div>
          <p className="location">
						{currentUser !== undefined ? currentUser.about : '...'}
					</p>
          <button>Followings : {currentUser && currentUser.followings}</button>
          <button>Followers : {currentUser && currentUser.followers}</button>
          {/*<SocialShare />*/}
          <div className='social-media'>
            <a
              href={(linksStore && 'http://' + linksStore.email) || '#!'}
              className='icon'
              target='_blank'
            >
              {(linksStore && linksStore.email && (
                <FiMail size={24} color='grey' />
              )) || <FiMail size={24} color='black' />}
            </a>
            <a
              href={(linksStore && 'http://' + linksStore.twitter) || '#!'}
              className='icon'
              target='_blank'
            >
              {(linksStore && linksStore.twitter && (
                <RiTwitterLine size={24} color='grey' />
              )) || <RiTwitterLine size={24} color='black' />}
            </a>
            <a
              href={(linksStore && 'http://' + linksStore.inst) || '#!'}
              className='icon'
              target='_blank'
            >
              {(linksStore && linksStore.inst && (
                <RiInstagramLine size={24} color='grey' />
              )) || <RiInstagramLine size={24} color='black' />}
            </a>
            <a
              href={(linksStore && 'http://' + linksStore.facebook) || '#!'}
              className='icon'
              target='_blank'
            >
              {(linksStore && linksStore.facebook && (
                <FiFacebook size={24} color='grey' />
              )) || <FiFacebook size={24} color='black' />}
            </a>
            <a
              href={(linksStore && 'http://' + linksStore.youtube) || '#!'}
              className='icon'
              target='_blank'
            >
              {(linksStore && linksStore.youtube && (
                <FiYoutube size={24} color='grey' />
              )) || <FiYoutube size={24} color='black' />}
            </a>
            <a
              href={(linksStore && 'http://' + linksStore.website) || '#!'}
              className='icon'
              target='_blank'
            >
              {(linksStore && linksStore.youtube && (
                <RiGlobalLine size={24} color='grey' />
              )) || <RiGlobalLine size={24} color='black' />}
            </a>
            <a href='#!' className='icon'>
              <FiUpload size={24} color='black' />
            </a>
          </div>
        </div>
      </div>
      <StyledTabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
        className='tabs-block'
      >
        <StyledTab label='My Creations' />
        <StyledTab label='My Collections' />
        {/*<Tab label="Favourites"/>*/}
        <StyledTab label='Recent activity' />
      </StyledTabs>
      {selectedTab === 0 && <MyCreation />}
      {selectedTab === 1 && (
        <MyCollectionsCards collectionBatch={props.batch} />
      )}
      {selectedTab === 2 && <RecentActivity />}
    </>
  );
};

export default MyProfileComponent;
