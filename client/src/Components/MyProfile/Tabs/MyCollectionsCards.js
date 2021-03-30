import React from 'react';

import CollectionsCards from "../CollectionsCards";

import bg1 from '../../../images/svg/bg1.svg';
import bg2 from '../../../images/svg/bg2.svg';
import bg3 from '../../../images/svg/bg3.svg';
import bg4 from '../../../images/svg/bg4.svg';
import './MyCollectionsCards.scss';

const MyCollectionsCards = () => {
	const mockArr = [
		{
			cardImage: bg1,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg2,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg3,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg4,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg1,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg2,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg3,
			cardTitle: 'By Creator',
		},
		{
			cardImage: bg4,
			cardTitle: 'By Creator',
		},
	]

	return (
		<div className="creation-wrapper-collections">
			<div className="creation-collections">
				{mockArr.map((item) => (
					<CollectionsCards {...item}/>
				))}
			</div>
		</div>
	)
}

export default MyCollectionsCards;