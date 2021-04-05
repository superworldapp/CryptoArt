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
				src={props['5']}
				alt={props['5']}
			/>
			<CardBody className="card-img-overlay-collection">
				<CardTitle className="card-user-title-collection">
					{props['2']}
				</CardTitle>
			</CardBody>
		</Card>
	)
}

export default CollectionsCards;
