import React, {useState} from 'react';

import CreationCards from "./CreationCards";
import SimpleMenu from "./menu/MenuListed";
import CreateFilterList from "./CreateFilterList";
import CreateChipList from "./CreateChipList";

import burger from '../../images/svg/burger-recently-list.svg';
import arrow from '../../images/svg/arrow.svg';
import './AllArtComponent.scss';

const AllItemComponent = (props) => {
	const mockList = [
		{
			name: "STATUS",
			lists: [{name: 'On Auction', key: 0}, {name: 'Buy Now', key: 1}, {name: 'Make Offer', key: 2}],
			id: 1,
		},
		{
			name: "TRENDING",
			lists: [{name: 'Text', key: 3}, {name: 'Text', key: 4}, {name: 'Text', key: 5}, {name: 'Text', key: 6}],
			id: 2,
		},
		{
			name: "Type",
			lists: [{name: 'Images', key: 7}, {name: 'GIF', key: 8}, {name: 'Video', key: 9}],
			id: 3,
		},
	];

	const [checked, setChecked] = useState([])

	const handleRemove = (elem) => {
		setChecked(checked.filter(el => el !== elem))
	}

	const handleRemoveAll = () => {
		setChecked([])
	}

	const handleCheck = (elem) => {
		if (checked.filter(el => el.key === elem.key && el.name === elem.name).length > 0) {
			setChecked(checked.filter(el => el.key !== elem.key && el.name !== elem.name))
		} else {
			setChecked(checked.concat(elem))
		}
	}

	return (
		<div className="container_marketplace">
			<div className="filter_list">
				<CreateFilterList
					list={mockList}
					checked={checked}
					handleCheck={handleCheck}
				/>
			</div>
			<divc className="chipCards">
				{checked.length > 0 &&
				<div className="chipList">
					<div className="chipHead">Filters</div>
					<div className="chips">
						<CreateChipList
							checked={checked}
							handleRemove={handleRemove}
							handleRemoveAll={handleRemoveAll}
						/>
					</div>
				</div>
				}
				<div className="cards_marketplace">
					<div className="head_result">
						<p className="head_result_num">
							{props.batch.length} Results
						</p>
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
							{props.batch.map((item) => (
								<CreationCards props={props} {...item}/>
							))}
						</div>
					</div>
				</div>
			</divc>
		</div>
	);
}

export default AllItemComponent;
