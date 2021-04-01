import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import CreationCards from './CreationCards';
import SimpleMenu from './menu/MenuListed';
import CreateFilterList from './CreateFilterList';
import CreateChipList from './CreateChipList';
import {
	setAllData,
	setFilteredData,
	setSearchValue
} from '../../redux/marketplace/actions';

import burger from '../../images/svg/burger-recently-list.svg';
import arrow from '../../images/svg/arrow.svg';
import './AllArtComponent.scss';

const WORD_KEY = 'word'

const AllItemComponent = (props) => {
	useEffect(() => {
		props.setAllData(props);
	}, []);

	const [checked, setChecked] = useState([]);
	const [word, setWord] = useState(null)

	const handleRemove = (elem) => {
		setChecked(checked.filter(el => el !== elem))
		if (elem.key === WORD_KEY) {
			props.setSearchValue({searchValue: ''})
		}
	};

	const handleRemoveAll = () => {
		setChecked([])
		props.setSearchValue({searchValue: ''})
	};

	const handleCheck = (elem) => {
		if (checked.filter(el => el.key === elem.key && el.name === elem.name).length > 0) {
			setChecked(checked.filter(el => el.key !== elem.key && el.name !== elem.name))
		} else {
			setChecked(checked.concat(elem))
		}
	};

	useEffect(() => {
		const batchItem = props.batch.find(word => props.searchValue.toLowerCase() === word._tokenBatchName.toLowerCase());

		if (batchItem) {
			const word = batchItem._tokenBatchName.toLowerCase()
			setWord(word)
		}
	}, [props.searchValue])

	useEffect(() => {
		if (word) {
			const wordObj = checked.find(({key}) => key === WORD_KEY)

			if (wordObj) {
				setChecked(checked.map(item => item.key !== WORD_KEY ? item : {...item, name: word}))
			} else {
				setChecked([...checked, {name: word, key: WORD_KEY}])
			}
		}
	}, [word])

	useEffect(() => {
		props.setFilteredData(props.batch.filter(batchItem => {
			return checked.find(cheap => cheap.name === batchItem._tokenBatchName.toLowerCase())
		}))
	}, [checked])
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
								? props.filteredData.map((item) => (
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
	searchValue: state.marketplace.searchValue,
});

const mapDispatchToProps = (dispatch) => ({
	setAllData: (data) => dispatch(setAllData(data)),
	setSearchValue: (data) => dispatch(setSearchValue(data)),
	setFilteredData: (data) => dispatch(setFilteredData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItemComponent);
