import React, { Component } from 'react';
import './NewHeaderComponent.css'
import LogoImg from '../images/logo.svg'
import UserIcon from '../images/user.png'
import {Navbar, NavLink} from 'reactstrap'


class NewHeader extends Component {
    render() {
        return (
        <div>
            <Navbar className='header-navbar'>
                <NavLink to='/home'>
                    <img
                    src={LogoImg}
                    alt='Logo Pic'
                    id='logo-img'
                    height='80'
                    width='80'
                    className='navbar-logo'  
                    />
                </NavLink>
                <div className='header-nav-links'>
                    <NavLink>
                        MARKETPLACE
                    </NavLink>
                    <NavLink>
                        PICKS
                    </NavLink>
                    <NavLink>
                        HELP
                    </NavLink>
                    <NavLink to='/home'>
                        <img
                        src={UserIcon}
                        alt='User Icon'
                        id='user-icon'
                        height='40'
                        width='40'
                        className='user-icon-img'        
                        />
                    </NavLink>
                </div>
                    
            </Navbar>
        </div>
        )
    }
}

export default NewHeader;