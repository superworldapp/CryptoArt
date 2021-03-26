import React from 'react';
import {
	Card,
	CardBody,
	CardImg,
	CardTitle,
} from 'reactstrap';

import './CollectionsCards.scss';

const CollectionsCards = (props) => {
	return (
		<Card className='card-wrapper-collection'>
			<CardImg
				top
				className="card-background-image-collection"
				src={props.cardImage}
				alt='image3'
			/>
			<CardBody className="card-img-overlay-collection">
				<CardTitle className="card-user-title-collection">
					{props.cardTitle}
				</CardTitle>
			</CardBody>
		</Card>
	)
}

export default CollectionsCards;
