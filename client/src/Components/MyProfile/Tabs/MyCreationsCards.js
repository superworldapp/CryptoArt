import React from 'react';

import CreationCards from '../CreationCards'

import profile from '../../../images/svg/profile-image.svg';
import coverImage from '../../../images/profileBg.jpg';
import './MyCreationsCards.scss';

const MyCreationCards = () => {

	const mockArr = [
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: coverImage,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
	];

	return (
		<div className="creation-wrapper">
			<div className="creation">
				{mockArr.map((item) => (
					<CreationCards {...item}/>
				))}
			</div>
		</div>
	)
}

export default MyCreationCards
