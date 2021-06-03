import https from 'https';
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    hostname: 'http://localhost:5000/',
    httpsAgent: https.Agent({
        rejectUnauthorized: false,
    }),
});

export const getAllItems = payload =>api.get(`/items`, payload);

export const getItemsById = id => api.get(`/item/${id}`);

export const insertItem = payload => api.post(`/item`, payload);

export const updateItemById = (id, payload) => api.put(`/item/${id}`, payload);

export const deleteItemById = id => api.delete(`/item/${id}`);

export const uploadItem = payload => api.post(`/upload`, payload);


const apis = {
    getAllItems,
    getItemsById,
    insertItem,
    updateItemById,
    deleteItemById,
    uploadItem
}

export default apis;