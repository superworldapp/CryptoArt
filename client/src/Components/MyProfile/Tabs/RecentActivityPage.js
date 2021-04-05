import React from 'react';

import RecentActivityCards from "../RecentActivityCards";

import profile from "../../../images/svg/profile-image.svg";
import bg4 from '../../../images/svg/avatar.svg';
import './RecentActivity.scss';

const RecentActivity = () => {
	const mockArr = [
		{
			text: 'Amelia liked the NFT by creator',
			avatar: profile,
			time: '20min ago',
			card: bg4,
		},
		{
			text: 'Amelia liked the NFT by creator',
			avatar: profile,
			time: '20min ago',
			card: bg4,
		},
		{
			text: 'Amelia liked the NFT by creator',
			avatar: profile,
			time: '20min ago',
			card: bg4,
		},
		{
			text: 'Amelia liked the NFT by creator',
			avatar: profile,
			time: '20min ago',
			card: bg4,
		},
	];

	return (
		<div className="recent-wrapper">
			<div className="recent-button">Public View</div>
			<div className="recent-main">
				{mockArr.map((item) => (
					<RecentActivityCards {...item}/>
				))}
			</div>
		</div>
	)
}

export default RecentActivity;
