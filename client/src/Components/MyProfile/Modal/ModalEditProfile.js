import React from 'react';

import email from '../../../images/svg/iconMail.svg'
import twitter from '../../../images/svg/iconTwitter.svg'
import inst from '../../../images/svg/iconInstagram.svg'
import facebook from '../../../images/svg/iconFacebook.svg'
import youtube from '../../../images/svg/iconYoutube.svg'
import info from '../../../images/svg/logoInfo.svg'
import './ModalEditProfile.scss';

const ModalEditProfile = ({isEdit}) => {
	const icoInp = [
		{name: 'E-mail', img: email},
		{name: 'Twitter', img: twitter},
		{name: 'Instagram', img: inst},
		{name: 'Facebook', img: facebook},
		{name: 'Youtube', img: youtube},
	];

	const modalRef = React.createRef()

	const handleClose = (e) => {
		const target = e.target;
		if (modalRef.current) {
			if (target === modalRef.current) {
				isEdit();
			}
		}
	}

	return (
		<div className="wrapper-edit-profile" onClick={e => handleClose(e)} ref={modalRef}>
			<div className="modal-edit-profile">
				<h2>Edit Profile</h2>
				<div className="content-edit-profile">
					<div className="with-icon-block">
						<span>Name</span>
						<input type="text"/>
					</div>
					<div className="with-icon-block">
						<span>Bio</span>
						<textarea/>
					</div>
					<div className="icon-block-scroll">
						{icoInp.map((item) => (
							<div className="icon-block">
								<div className="icon_text">
									<img src={item.img} alt={item.name}/>
									<span>{item.name}</span>
								</div>
								<div className="input_icon">
									<input type="text"/>
									<img src={info} alt="info"/>
								</div>
							</div>
						))}
					</div>
				</div>
				<button>Save</button>
			</div>
		</div>
	);
};

export default ModalEditProfile;
