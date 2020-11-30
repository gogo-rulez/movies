import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://www.omdbapi.com/?apikey=485f0d80&',
    params: {}
});

