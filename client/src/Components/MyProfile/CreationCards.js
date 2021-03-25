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

import './CreationCards.scss';

const CreationCards = (props) => {
	return (
		<>
			<Card className='imageCards'>
				<CardImg
					top
					className="Cardimg"
					src={props.cardImage}
					alt='image3'
				/>
				<CardImgOverlay className="imgOverlay">
					<img className="userimg" src={props.profileImage} alt="userImg"/>
					<CardTitle className="card-imgTitle">
						{props.cardTitle}
					</CardTitle>
				</CardImgOverlay>
				<CardBody>
					<div className="cardImg-body">
						<CardSubtitle className="createdby">
							{props.CardSubtitle}
						</CardSubtitle>
						&nbsp;
						<CardSubtitle className="cardsubtitleName">
							{props.CardSubtitleName}
						</CardSubtitle>
					</div>
					<div className='ctext'>
						<CardText className="price">
							{props.price}
							<p className="USD-price">
								{props.usdPrice}
							</p>
						</CardText>
						<div>
							<button className='buy-bid-btn'>Place Bid</button>
						</div>
					</div>
					<div className='buy-bid-btn-div'>
						<p className='time-div'>
							{props.time}
						</p>
					</div>
				</CardBody>
			</Card>
		</>
	)
}

export default CreationCards;
