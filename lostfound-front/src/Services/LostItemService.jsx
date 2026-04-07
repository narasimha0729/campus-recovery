import axios from 'axios';

const LOST_URL = 'http://localhost:9602/lostfound/lost';
const ID_URL = 'http://localhost:9602/lostfound/lost-id';
const USR_URL = 'http://localhost:9602/lostfound/lost-user';


export const saveLostItem = (lostItem) => {
    return axios.post(LOST_URL, lostItem, {
        withCredentials: true
    });
}

	export const getAllLostItems = () => {
    return axios.get(LOST_URL, {
        withCredentials: true
    });
}

	export const getLostItemById = (lostItemId) => {
    return axios.get(`${LOST_URL}/${lostItemId}`, {
        withCredentials: true
    });
}

	export const deleteLostItemById = (lostItemId) => {
    return axios.delete(`${LOST_URL}/${lostItemId}`, {
        withCredentials: true
    });
}
    export const updateLostItem = (lostItem) => {
    return axios.put(LOST_URL, lostItem, {
        withCredentials: true
    });
}
	export const generateId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}
		
	export const getLostItemsByUsername = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
}

export const getLostItemByFoundItem = (foundItemId) => {
    return axios.get(`${ID_URL}/${foundItemId}`, {
        withCredentials: true
    });
}
	