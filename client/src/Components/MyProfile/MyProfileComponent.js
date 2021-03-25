import React, { Component } from 'react';
import {Tabs, Tab} from "@material-ui/core";
import MyCreation from './MyCreationsCards'
import Header from '../HeaderComponent'
import coverImage from '../../images/image 200.png';
import profileImage from '../../images/profile-image.png';
import { RiTwitterLine, RiInstagramLine, RiGlobalLine } from 'react-icons/ri'
import { FiFacebook, FiYoutube, FiUpload, FiMail } from 'react-icons/fi'
import {FaCheckCircle} from 'react-icons/fa'
import './MyProfileComponent.css'
const MyProfileComponent = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return(
        <> 
            <div className = "profile-info">
                <div className = "cover-container"><img className = "cover-img" src = {coverImage}></img></div>
                <div className = "user-container"><img className="user-img" src = {profileImage}></img></div>
                <p className = "user-name">@amelia_creator <FaCheckCircle color = "green"/></p>
                <p className = "creator-name">Amelia</p>
                <p className = "location">Bagno a Ripoli, Tuscany, Italy</p>
                <div className = "social-media">
                    <a href = "#!" className = "icon">
                        <FiMail size = {24} color = "black"/>
                    </a>
                    <a href = "#!" className = "icon">
                        <RiTwitterLine size = {24} color = "black"/>
                    </a>
                    <a href = "#!" className = "icon">
                        <RiInstagramLine size = {24} color = "black"/>
                    </a>
                    <a href = "#!" className = "icon">
                        <FiFacebook size = {24} color = "black"/>
                    </a>
                    <a href = "#!" className = "icon">
                        <FiYoutube size = {24} color = "black"/>
                    </a>
                    <a href = "#!" className = "icon">
                        <RiGlobalLine size = {24} color = "black"/>
                    </a>
                    <a href = "#!" className = "icon">
                    <FiUpload size = {24} color = "black"/>
                    </a>
                    
                </div>
            </div>
            <Tabs 
            value = {selectedTab} 
            onChange = {handleChange} 
            indicatorColor="primary"
            textColor="primary"
            centered
            >
                <Tab label = "My Creations"></Tab>
                <Tab label = "My Collections"/>
                <Tab label = "Favorites"/>
                <Tab label = "Recent Activity"/>
            </Tabs>
            {selectedTab === 0 && <MyCreation/>}
        </>
    );
};
export default MyProfileComponent