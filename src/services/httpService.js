import axios from 'axios';

const httpService = axios.create({
    baseURL: 'http://localhost:3001',
});

export async function getCities() {
    const response = await httpService.get('/cities');
    return response.data;
}

export async function getElections() {
    const response = await httpService.get('/election');
    return response.data;
}

export async function getCandidates() {
    const response = await httpService.get('/candidates');
    return response.data;
}
