import { LocationQueryValue } from 'vue-router';
import axios from '../http/axios'

export default {
    getScopusData(limit = 10 as number , offset = 1 as number, search = {} as { type: string, field: string}, filter = "" as string | LocationQueryValue[] ) {
        return axios.get(`/elsevier/scopusList`, { params: { limit, offset, search, filter }});
    },
};