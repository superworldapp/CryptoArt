import React, {useState, useEffect} from 'react';
import Axios from "axios";

import Auth from "../../Auth";

import email from '../../../images/svg/iconMail.svg'
import twitter from '../../../images/svg/iconTwitter.svg'
import inst from '../../../images/svg/iconInstagram.svg'
import facebook from '../../../images/svg/iconFacebook.svg'
import youtube from '../../../images/svg/iconYoutube.svg'
import info from '../../../images/svg/logoInfo.svg'
import website from '../../../images/svg/websiteIcon.svg'
import './ModalEditProfile.scss';

const ModalEditProfile = ({isEdit, setLinksState, emailName, form, setForm, getUser}) => {

	const icoInp = [
		{
			name: 'E-mail',
			img: email,
			type: 'email',
			value: emailName
		},
		{
			name: 'Twitter',
			img: twitter,
			type: 'twitter',
			value: setLinksState.social.twitter
		},
		{
			name: 'Instagram',
			img: inst,
			type: 'instagram',
			value: setLinksState.social.instagram
		},
		{
			name: 'Facebook',
			img: facebook,
			type: 'facebook',
			value: setLinksState.social.facebook
		},
		{
			name: 'Youtube',
			img: youtube,
			type: 'youtube',
			value: setLinksState.social.youtube
		},
		{
			name: 'Website',
			img: website,
			type: 'website',
			value: setLinksState.social.website
		},
	];

	const changeUsernameOnSubmit = () => {
		Axios.defaults.headers = {
			Authorization: Auth.getToken(),
		};
		const tk = Auth.getToken();
		const { userId, session } = tk;
		Axios.post(
			`${process.env.REACT_APP_SW_API_URL}/user/update/${userId}/${session}`,
			{
				name: form.name,
				about: form.about,
				email: form.email,
				social: {
					instagram: form.instagram,
					facebook: form.facebook,
					youtube: form.youtube,
					twitter: form.twitter,
					website: form.website,
				}
			}
		)
			.then((response) => {
				getUser()
			})
			.catch((error) => {
				// console.log(error);
			});
	};

	const handleUserInput = (event, target) => {
		const {value} = event.target
		setForm(prevState => ({
				...prevState,
				[target]: value
			}
		));
	};

	const modalRef = React.createRef()

	const handleClose = (e) => {
		const target = e.target;
		if (modalRef.current) {
			if (target === modalRef.current) {
				isEdit();
			}
		}
	}

	const handleSaveInfo = () => {
		changeUsernameOnSubmit();
		isEdit();
	}

	return (
		<div className="wrapper-edit-profile" onClick={e => handleClose(e)} ref={modalRef}>
			<div className="modal-edit-profile">
				<h2>Edit Profile</h2>
				<div className="content-edit-profile">
					<div className="with-icon-block">
						<span>Name</span>
						<input
							type="text"
							defaultValue={setLinksState.name}
							onChange={e => handleUserInput(e, 'name')}/>
					</div>
					<div className="with-icon-block">
						<span>Bio</span>
						<textarea
							defaultValue={setLinksState.about}
							onChange={e => handleUserInput(e, 'about')}/>
					</div>
					<div className="icon-block-scroll">
						{icoInp.map((item) => (
							<div className="icon-block">
								<div className="icon_text">
									<img src={item.img} alt={item.name}/>
									<span>{item.name}</span>
								</div>
								<div className="input_icon">
									{item.type === 'email'
										? (
											<input
												type="text"
												className="input_icon_readonly"
												placeholder={item.value}
												readOnly
											/>
									) : (
											<input
												type="text"
												defaultValue={item.value}
												onChange={e => handleUserInput(e, item.type)}
											/>
										)}
									<img src={info} alt="info"/>
								</div>
							</div>
						))}
					</div>
				</div>
				<button onClick={handleSaveInfo}>Save</button>
			</div>
		</div>
	);
};

export default ModalEditProfile;