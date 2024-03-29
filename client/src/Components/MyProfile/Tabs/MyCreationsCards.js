import React, {useEffect} from 'react';

import CreationCards from '../CreationCards'

import profile from '../../../images/svg/profile-image.svg';
import './MyCreationsCards.scss';

import {connect} from "react-redux";

const MyCreationCards = (props) => {

	const newArt3 = props.art3.map((item) => ({
		cardImage: item._imgUrl,
		profileImage: profile,
		cardTitle: item._tokenBatchName,
		CardSubtitle: 'by',
		CardSubtitleName: 'Amelia',
		price: item._sellPrice,
		usdPrice: '($985.56 USD)',
		time: item._bidEnd,
	}))

	return (
		<div className="creation-wrapper">
			<div className="creation">
				{newArt3.map((item) => (
					<CreationCards {...item} />
				))}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	art3: state.myStoreComponent.art3,
});

export default connect(mapStateToProps, null)(MyCreationCards);
