import axios from '../http/axios'

export default {
    getAllRegions() {
        return axios.get('/allRegions');
    },

    getRegion(tableName : string | string[] , size = 10 as number , page = 1 as number) {
        return axios.get(`/table/${tableName}`, { params: { size, page }});
    },

    getNews(tableName : string | string[] , id : string | string[] ) {
        return axios.get(`/table/${tableName}/${id}`);
    },

};