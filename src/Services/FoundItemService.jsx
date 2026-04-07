import axios from 'axios';

const FOUND_URL = 'http://localhost:9602/lostfound/found';
const ID_URL = 'http://localhost:9602/lostfound/found-id';
const USR_URL = 'http://localhost:9602/lostfound/found-user';

export const saveFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
}

export const getAllFoundItems = () => {
    return axios.get(FOUND_URL, {
        withCredentials: true
    });
}

export const getFoundItemById = (foundItemId) => {
    return axios.get(`${FOUND_URL}/${foundItemId}`, {
        withCredentials: true
    });
}

export const deleteFoundItemById = (foundItemId) => {
    return axios.delete(`${FOUND_URL}/${foundItemId}`, {
        withCredentials: true
    });
}

export const generateFoundId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}

export const getFoundItemsByUsername = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
}

export const getFoundItemByLostItem = (id) =>{
    return axios.get(`${ID_URL}/${id}`,{
        withCredentials: true
    });

}