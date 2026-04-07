import axios from 'axios';

const BASE_URL = 'http://localhost:9602/lostfound';
const MATCH_URL = `${BASE_URL}/match`;

export const saveMatchItem = (matchItem) => {
    return axios.post(MATCH_URL, matchItem, {
        withCredentials: true
    });
}

export const getAllMatchItems = () => {
    return axios.get(MATCH_URL, {
        withCredentials: true
    });
}

export const getPotentialMatches = () => {
    return axios.get(`${BASE_URL}/potential-matches`, {
        withCredentials: true
    });
}
