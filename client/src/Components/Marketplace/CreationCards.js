import React from 'react';
import {
	Card,
	CardBody,
	CardSubtitle,
	CardText,
	CardImg,
	CardImgOverlay,
	CardTitle,
} from 'reactstrap';

import heart from '../../images/svg/heartSvg.svg';
import './CreationCards.scss';

const CreationCards = (props) => {
	// console.log('========>props', props);

	return (
		<Card className='card-wrapper'>
			<CardImg
				top
				className="card-background-image"
				src={props.cardImage}
				alt='image3'
			/>
			<CardImgOverlay className="card-img-overlay">
				<div className="card-user-img">
					<img src={props.profileImage} alt="userImg"/>
				</div>
				<div className="card-user-heart">
					<img src={heart} alt="heart"/>
				</div>
				<CardTitle className="card-user-title">
					{props.cardTitle || 'none'}
				</CardTitle>
			</CardImgOverlay>
			<CardBody className="card-body">
				<div className="card-user-body">
					<CardSubtitle className="card-created-by">
						{props.CardSubtitle || 'none'}
					</CardSubtitle>
					<CardSubtitle className="card-subtitle-name">
						{props.CardSubtitleName || 'none'}
					</CardSubtitle>
				</div>
				<div className='card-text-info'>
					<CardText className="card-text-info-price">
						{props.price || 'none'}
						<p className="card-text-info-usd">
							{props.usdPrice || 'none'}
						</p>
					</CardText>
					<div>
						<button className='card-buy-button'>Bid</button>
					</div>
				</div>
				<div className='card-buy-time'>
					<p className='card-buy-time-text'>
						{props.time || 'none'}
					</p>
				</div>
			</CardBody>
		</Card>
	)
}

export default CreationCards;
