import axios from 'axios';
const LOGIN_URL='http://localhost:9602/lostfound/login';
const REGISTER_URL='http://localhost:9602/lostfound/register';
const ROLE_URL='http://localhost:9602/lostfound/role';
const USER_URL='http://localhost:9602/lostfound/user';
const LOGOUT_URL ='http://localhost:9602/lostfound/logout';
const ME_URL='http://localhost:9602/lostfound/me';

export const getAllStudents = () => {
    return axios.get(`${LOGIN_URL.replace('/login', '/student')}`, {
        withCredentials: true
    });
}

export const registerNewUser = (user) => {
    return axios.post(REGISTER_URL, user, {
        withCredentials: true
    });
}

export const validateUser = (userId, password) => {
    return axios.post(LOGIN_URL, { username: userId, password: password }, {
        withCredentials: true
    });
}

export const getUserDetails = () => {
    return axios.get(LOGIN_URL, {
        withCredentials: true
    });
}

export const deleteUser = (username) => {
    return axios.delete(`${LOGIN_URL}/${username}`, {
        withCredentials: true
    });
}

export const getUserId = () => {
    return axios.get(USER_URL, {
        withCredentials: true
    });
}

export const getRole = () => {
    return axios.get(ROLE_URL, {
        withCredentials: true
    });
}

export const getUser = () => {
    return axios.get(ME_URL, {
        withCredentials: true
    });
}

export const logout = () => {
    return axios.post(LOGOUT_URL, {
        withCredentials: true
    });
}

export const getAllUsers = () => {
    return axios.get(`${LOGIN_URL.replace('/login', '/all-users')}`, {
        withCredentials: true
    });
}