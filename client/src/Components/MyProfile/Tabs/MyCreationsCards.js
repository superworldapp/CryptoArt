import React from 'react';

import CreationCards from '../CreationCards'

import image200 from '../../../images/image 200.png';
import profile from '../../../images/svg/profile-image.svg';

import './MyCreationsCards.scss';

const MyCreationCards = () => {
	const mockArr = [
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
		{
			cardImage: image200,
			profileImage: profile,
			cardTitle: 'Alimation Character',
			CardSubtitle: 'Created by',
			CardSubtitleName: 'Amelia',
			price: '0.5ETH',
			usdPrice: '($985.56 USD)',
			time: '26 hrs 42 mins remaining',
		},
	]

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
