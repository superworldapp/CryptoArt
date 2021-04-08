import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import CreationCards from './CreationCards';
import SimpleMenu from './menu/MenuListed';
import CreateFilterList from './CreateFilterList';
import CreateChipList from './CreateChipList';
import {
	setAllData,
	setFilteredData,
	setSearchValue,
	setSearchValueState,
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
	const [word, setWord] = useState(null);

	const handleRemove = (elem) => {
		setChecked(checked.filter(el => el !== elem))
		if (elem.key === WORD_KEY) {
			props.setSearchValue({searchValue: ''});
			props.setSearchValueState({searchValueState: ''});
			setWord(null);
		}
	};

	const handleRemoveAll = () => {
		setChecked([]);
		props.setSearchValue({searchValue: ''});
		props.setSearchValueState({searchValueState: ''});
		setWord(null)
	};

	const handleCheck = (elem) => {
		if (checked.filter(el => el.key === elem.key && el.name === elem.name).length > 0) {
			setChecked(checked.filter(el => el.key !== elem.key && el.name !== elem.name))
		} else {
			setChecked(checked.concat(elem))
		}
	};

	useEffect(() => {
		setWord(props.searchValue)
	}, [props.searchValue])

	useEffect(() => {
		if (word) {
			const wordObj = checked.find(({key}) => key === WORD_KEY)

			if (wordObj) {
				if (wordObj.name.length !== 0) {
					setChecked(checked.map(item => item.key !== WORD_KEY ? item : {...item, name: word}))
				}
			} else {
				setChecked([...checked, {name: word, key: WORD_KEY}])
			}
		} else {
			setChecked(checked.filter(item => item.key !== WORD_KEY))
		}
	}, [word])

	useEffect(() => {
		props.setFilteredData(props.batch.filter(batchItem => {
			const resultData = checked.reduce((acc, cheap) => {
				if (!acc) return false
				let result = null

				if (cheap.key === WORD_KEY) {
					result = word && new RegExp(word, 'i').test(batchItem._tokenBatchName)
				} else if (cheap.name === 'Images') {
					result = batchItem._imgurl.match(/(?<=\.)(?:jpe?g|png|gif|svg|tiff)$/i)
				} else if (cheap.name === 'GIF') {
					result = batchItem._imgurl.match(/(?<=\.)(?:gif)$/i)
				} else if (cheap.name === 'Video') {
					result = batchItem._imgurl.match(/(?<=\.)(?:mpeg-4|mp4|mov|avi|wmv)$/i)
				} else if (cheap.name === 'Audio') {
					result = batchItem._imgurl.match(/(?<=\.)(?:mp3)$/i)
				}

				return result
			}, true)
			return resultData
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
							{checked.length > 0
								? props.filteredData.length
								: props.batch.length
							}
							&ensp;Results
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
							{checked.length > 0
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
	searchValueState: state.marketplace.searchValueState,
});

const mapDispatchToProps = (dispatch) => ({
	setAllData: (data) => dispatch(setAllData(data)),
	setSearchValue: (data) => dispatch(setSearchValue(data)),
	setFilteredData: (data) => dispatch(setFilteredData(data)),
	setSearchValueState: (data) => dispatch(setSearchValueState(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItemComponent);
