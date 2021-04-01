import { SET_ALL_DATA, SET_FILTERED_DATA, SET_SEARCH_VALUE } from "../types";

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

export function setSearchValue({searchValue}) {
	return {
		type: SET_SEARCH_VALUE,
		payload: searchValue,
	}
}

