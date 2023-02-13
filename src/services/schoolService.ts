import axios from '../http/axios'

export default {
    getFipiInfo(examName : string | string[]) {
        return axios.get(`/${examName}`);
    },
};