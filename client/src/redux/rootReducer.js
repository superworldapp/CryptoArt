import { combineReducers } from 'redux';
import { reducer } from './marketplace/reducer';
import { reducer as reducerMyStore } from './myStoreComponent/reducer';
import { reducer as reducerMyCollection } from './myCollection/reducer';
import { reducer as reducerMyProfile } from './myProfile/reducer';


export const rootReducer = combineReducers({
	marketplace: reducer,
	myStoreComponent: reducerMyStore,
	myCollection: reducerMyCollection,
	myProfile: reducerMyProfile,
})
