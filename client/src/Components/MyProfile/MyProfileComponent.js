import React, {useState} from 'react';
import {Tabs, Tab} from "@material-ui/core";
import {
	RiTwitterLine,
	RiInstagramLine,
	RiGlobalLine
} from 'react-icons/ri'
import {
	FiFacebook,
	FiYoutube,
	FiUpload,
	FiMail
} from 'react-icons/fi'
import MyCreation from './Tabs/MyCreationsCards'
import MyCollections from "./Tabs/MyCollections";
import RecentActivity from "./Tabs/RecentActivity";
import ModalEditProfile from "./Modal/ModalEditProfile";

import coverImage from '../../images/profileBg.jpg';
import profileImage from '../../images/svg/profile-image.svg';
import successLogo from '../../images/svg/successLogo.svg'
import './MyProfileComponent.scss'


const MyProfileComponent = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [isEdit, setIsEdit] = useState(false);

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	const handleEdit = () => {
		setIsEdit(!isEdit);
	}

	return (
		<>
			<div className='profile-info'>
				{isEdit ? <ModalEditProfile isEdit={handleEdit}/> : null}
				<div className="cover-container">
					<img
						src={coverImage}
						alt="cover-img"
					/>
				</div>
				<div className="user-container">
					<img
						className="user-img"
						src={profileImage}
						alt="user-img"
					/>
					<div className={"user-img-hover"}>
						<div className="edit" onClick={handleEdit}>Edit</div>
						<div className="upload">Upload</div>
					</div>
				</div>
				<p className="user-name">
					@amelia_creator
					<img src={successLogo} alt="logo"/>
				</p>
				<p className="creator-name">
					Amelia
				</p>
				<p className="location">
					Bagno a Ripoli, Tuscany, Italy
				</p>
				<div className="social-media">
					<a href="#!" className="icon">
						<FiMail size={24} color="black"/>
					</a>
					<a href="#!" className="icon">
						<RiTwitterLine size={24} color="black"/>
					</a>
					<a href="#!" className="icon">
						<RiInstagramLine size={24} color="black"/>
					</a>
					<a href="#!" className="icon">
						<FiFacebook size={24} color="black"/>
					</a>
					<a href="#!" className="icon">
						<FiYoutube size={24} color="black"/>
					</a>
					<a href="#!" className="icon">
						<RiGlobalLine size={24} color="black"/>
					</a>
					<a href="#!" className="icon">
						<FiUpload size={24} color="black"/>
					</a>
				</div>
			</div>
			<Tabs
				value={selectedTab}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="My Creations" />
				<Tab label="My Collections" />
				{/*<Tab label="Favourites"/>*/}
				<Tab label="Recent Activity"/>
			</Tabs>
			{selectedTab === 0 && <MyCreation/>}
			{selectedTab === 1 && <MyCollections/>}
			{selectedTab === 2 && <RecentActivity/>}
		</>
	);
};
export default MyProfileComponent
