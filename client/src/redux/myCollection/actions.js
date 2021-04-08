import { SET_ALL_GALLERY } from "../types";

export function setAllGallery(galleryValue) {
	return {
		type: SET_ALL_GALLERY,
		payload: galleryValue,
	}
}