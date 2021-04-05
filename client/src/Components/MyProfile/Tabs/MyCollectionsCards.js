import React from 'react';

import CollectionsCards from "../CollectionsCards";

import './MyCollectionsCards.scss';

const MyCollectionsCards = ({collectionBatch}) => {

	return (
		<div className="creation-wrapper-collections">
			<div className="creation-collections">
				{collectionBatch.map((item) => (
					<CollectionsCards {...item}/>
				))}
			</div>
		</div>
	)
}

export default MyCollectionsCards;
