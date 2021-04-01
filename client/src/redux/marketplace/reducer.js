import {
	SET_ALL_DATA,
	CHIPS_DATA,
	SET_FILTERED_DATA,
	SET_INPUT_VALUE,
} from '../types';

const initialState = {
	chipData: [
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
	],
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CHIPS_DATA:
			return action.payload
		case SET_ALL_DATA:
			return {...state, setAllData: action.payload}
		case SET_FILTERED_DATA:
			return {...state, setFilteredData: action.payload}
		case SET_INPUT_VALUE:
			return {...state, inputValue: action.payload}
		default:
			return state
	}
}