import {
	SET_ALL_DATA,
	CHIPS_DATA,
	SET_FILTERED_DATA,
	SET_SEARCH_VALUE, SET_SEARCH_VALUE_STATE,
} from '../types';

const initialState = {
	chipData: [
		{
			name: "STATUS",
			lists: [{name: 'On Auction', key: 0}, {name: 'Buy Now', key: 1}],
			id: 1,
		},
		{
			name: "TRENDING",
			lists: [{name: 'Text', key: 3}, {name: 'Text', key: 4}, {name: 'Text', key: 5}, {name: 'Text', key: 6}],
			id: 2,
		},
		{
			name: "Type",
			lists: [
				{
					name: 'Images',
					key: 7
				},
				{
					name: 'GIF',
					key: 8
				},
				{
					name: 'Video',
					key: 9
				},
				{
					name: 'Audio',
					key: 10
				},
				{
					name: '3D',
					key: 11
				}
			],
			id: 3,
		},
	],
	searchValue: '',
	searchValueState: '',
	setAllData: {
		batch: [],
	},
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CHIPS_DATA:
			return action.payload
		case SET_ALL_DATA:
			return {...state, setAllData: action.payload}
		case SET_FILTERED_DATA:
			return {...state, setFilteredData: action.payload}
		case SET_SEARCH_VALUE:
			return {...state, searchValue: action.payload}
		case SET_SEARCH_VALUE_STATE:
			return {...state, searchValueState: action.payload}
		default:
			return state
	}
}