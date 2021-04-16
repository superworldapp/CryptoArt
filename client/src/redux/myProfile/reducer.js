import {
	SET_CURRENT_USER,
} from '../types';

const initialState = {
	currentUserValue: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUserValue: action.payload,
			}
		default:
			return state
	}
};
