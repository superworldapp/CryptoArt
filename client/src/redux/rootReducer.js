import { combineReducers } from 'redux';
import { reducer } from './marketplace/reducer';

export const rootReducer = combineReducers({
	marketplace: reducer,
})