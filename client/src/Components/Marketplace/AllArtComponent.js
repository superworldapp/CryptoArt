import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import CreationCards from "./CreationCards";
import SimpleMenu from "./menu/MenuListed";
import CreateFilterList from "./CreateFilterList";
import CreateChipList from "./CreateChipList";
import { setAllData, setInputValue } from "../../redux/marketplace/actions";

import burger from '../../images/svg/burger-recently-list.svg';
import arrow from '../../images/svg/arrow.svg';
import './AllArtComponent.scss';

const AllItemComponent = (props) => {
	useEffect(() => {
		props.setAllData(props);
	}, []);

	const [checked, setChecked] = useState([]);

	const handleRemove = (elem) => {
		setChecked(checked.filter(el => el !== elem))
	};

	const handleRemoveAll = () => {
		setChecked([])
		props.setInputValue({inputValue: ''})
	};

	const handleCheck = (elem) => {
		if (checked.filter(el => el.key === elem.key && el.name === elem.name).length > 0) {
			setChecked(checked.filter(el => el.key !== elem.key && el.name !== elem.name))
		} else {
			setChecked(checked.concat(elem))
		}
	};

	if (props.filteredData) {
		if (props.filteredData.length > 0) {
			checked.push({name: props.filteredData[0]._tokenBatchName, key: props.filteredData[0]._batchId});
		}
	}
	return (
		<div className="container_marketplace">
			<div className="filter_list">
				<CreateFilterList
					list={props.chips}
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
							{props.filteredData && props.filteredData.length > 0
								? props.filteredData.length
								: props.batch.length
							}
							Results
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
							{props.filteredData && props.filteredData.length > 0
								?	props.filteredData.map((item) => (
									<CreationCards props={props} {...item}/>
								))
								: props.batch.map((item) => (
								<CreationCards props={props} {...item}/>
							))}
						</div>
					</div>
				</div>
			</divc>
		</div>
	);
};

const mapStateToProps = (state) => ({
	chips: state.marketplace.chipData,
	filteredData: state.marketplace.setFilteredData,
});

const mapDispatchToProps = (dispatch) => ({
	setAllData: (data) => dispatch(setAllData(data)),
	setInputValue: (data) => dispatch(setInputValue(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItemComponent);
