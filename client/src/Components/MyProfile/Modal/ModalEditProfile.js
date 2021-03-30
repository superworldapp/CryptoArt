import React, {useState} from 'react';

import email from '../../../images/svg/iconMail.svg'
import twitter from '../../../images/svg/iconTwitter.svg'
import inst from '../../../images/svg/iconInstagram.svg'
import facebook from '../../../images/svg/iconFacebook.svg'
import youtube from '../../../images/svg/iconYoutube.svg'
import info from '../../../images/svg/logoInfo.svg'
import website from '../../../images/svg/websiteIcon.svg'
import './ModalEditProfile.scss';

const ModalEditProfile = ({isEdit, setLinksState}) => {
	const [form, setForm] = useState({
		name: '',
		bio: '',
		email: '',
		twitter: '',
		inst: '',
		facebook: '',
		youtube: '',
		website: '',
	});

	const icoInp = [
		{name: 'E-mail', img: email, type: 'email'},
		{name: 'Twitter', img: twitter, type: 'twitter'},
		{name: 'Instagram', img: inst, type: 'inst'},
		{name: 'Facebook', img: facebook, type: 'facebook'},
		{name: 'Youtube', img: youtube, type: 'youtube'},
		{name: 'Website', img: website, type: 'website'},
	];

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
		setLinksState(form);
		isEdit()
	}

	return (
		<div className="wrapper-edit-profile" onClick={e => handleClose(e)} ref={modalRef}>
			<div className="modal-edit-profile">
				<h2>Edit Profile</h2>
				<div className="content-edit-profile">
					<div className="with-icon-block">
						<span>Name</span>
						<input type="text" onChange={e => handleUserInput(e, 'name')}/>
					</div>
					<div className="with-icon-block">
						<span>Bio</span>
						<textarea onChange={e => handleUserInput(e, 'bio')}/>
					</div>
					<div className="icon-block-scroll">
						{icoInp.map((item) => (
							<div className="icon-block">
								<div className="icon_text">
									<img src={item.img} alt={item.name}/>
									<span>{item.name}</span>
								</div>
								<div className="input_icon">
									<input type="text" onChange={e => handleUserInput(e, item.type)}/>
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