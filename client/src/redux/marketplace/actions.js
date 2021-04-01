import { SET_ALL_DATA, SET_FILTERED_DATA, SET_INPUT_VALUE } from "../types";

export function setAllData(allData) {
	return {
		type: SET_ALL_DATA,
		payload: allData,
	}
}

export function setFilteredData(filteredData) {
	return {
		type: SET_FILTERED_DATA,
		payload: filteredData,
	}
}

export function setInputValue({inputValue}) {
	return {
		type: SET_INPUT_VALUE,
		payload: inputValue,
	}
}

