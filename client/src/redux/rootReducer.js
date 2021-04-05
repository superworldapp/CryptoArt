import { combineReducers } from 'redux';
import { reducer } from './marketplace/reducer';
import { reducer as reducerMyStore } from './myStoreComponent/reducer';

export const rootReducer = combineReducers({
	marketplace: reducer,
	myStoreComponent: reducerMyStore,
})
