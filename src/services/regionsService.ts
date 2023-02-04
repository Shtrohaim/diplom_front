import { LocationQueryValue } from 'vue-router';
import axios from '../http/axios'

export default {
    getAllRegions() {
        return axios.get('/allRegions');
    },

    getRegion(tableName : string | string[] , size = 10 as number , page = 1 as number, search = "" as string | LocationQueryValue[] ) {
        return axios.get(`/table/${tableName}`, { params: { size, page, search }});
    },

    getNews(tableName : string | string[] , id : string | string[] ) {
        return axios.get(`/table/${tableName}/${id}`);
    },

};