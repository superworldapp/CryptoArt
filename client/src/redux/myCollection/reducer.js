import {
	SET_ALL_GALLERY,
} from '../types';

const initialState = {
	galleryValue: [
		{
			name: 'All Cards',
		}
	],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_GALLERY:
			return {
				...state,
				galleryValue: action.payload,
			}
		default:
			return state
	}
};
