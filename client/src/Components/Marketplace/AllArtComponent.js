import React from 'react';

import CreationCards from "./CreationCards";
import SimpleMenu from "./menu/MenuListed";
import CreateFilterList from "./CreateFilterList";

import profile from '../../images/svg/avatar.svg';
import coverImage from '../../images/arcDeTriomphe.jpeg';
import burger from '../../images/svg/burger-recently-list.svg';
import arrow from '../../images/svg/arrow.svg';
import './AllArtComponent.scss';

const AllItemComponent = (props) => {
	// console.log('========>props', props);
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
	]

	const mockList = [
		{
			name: "STATUS",
			lists: [{name: 'On Auction'}, {name: 'Buy Now'}, {name: 'Make Offer'}]
		},
		{
			name: "TRENDING",
			lists: [{name: 'Text'}, {name: 'Text'}, {name: 'Text'}, {name: 'Text'}]
		},
	];

	return (
		<div className="container_marketplace">
			<div className="filter_list">
				<CreateFilterList list={mockList}/>
			</div>
			<div className="cards_marketplace">
				<div className="head_result">
					<p className="head_result_num">{props.batch.length} Results</p>
					<p className="head_result_menu">
						<img
							className="burger_img"
							src={burger}
							alt="burger"
						/>
						<SimpleMenu/>
						<img
							className="arrow_img"
							src={arrow}
							alt="arrow"
						/>
					</p>
				</div>
				<div className="cards_wrapper">
					<div className="creation_cards">
						{mockArr.map((item) => (
							<CreationCards props={props} {...item}/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllItemComponent;
