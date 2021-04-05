import {
	SET_ART
} from '../types';

const initialState = {
	art3: [],
}

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ART:
			return action.payload
		default:
			return state
	}
}
