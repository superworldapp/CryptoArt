import { SET_CURRENT_USER } from "../types";

export function setCurrentUser(currenUserValue) {
	return {
		type: SET_CURRENT_USER,
		payload: currenUserValue,
	}
}