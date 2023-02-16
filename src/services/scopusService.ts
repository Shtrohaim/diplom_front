import { LocationQueryValue } from 'vue-router';
import axios from '../http/axios'

import FilterType from '@/types/filterType'
/* eslint-disable @typescript-eslint/no-unused-vars */

export default {
    getScopusData(limit = 10 as number , offset = 1 as number, search = {} as { type: string, field: string}, queryFilter = {} as FilterType | LocationQueryValue[] ) {
        const filter = Object.fromEntries(Object.entries(queryFilter).filter(([_, v]) => v != "undefined"));
        return axios.get(`/elsevier/scopusList`, { params: { limit, offset, search, filter }});
    },
    getSubjectsList() {
        return axios.get(`/elsevier/subjects`);
    },
};