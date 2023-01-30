import axios from '../http/axios'

export default {
    getAllRegions() {
        return axios.get('/allRegions');
    },


    getRegion(tableName : string | string[]) {
        return axios.get(`/table/${tableName}`);
    },

};