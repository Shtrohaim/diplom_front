import axios from '@/http/axios'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  async getScopusData(query: any) {
    const limit = query.size
    const offset = query.page
    const qFilter = query.qFilter
    const search = query.qSearch
    const filter = Object.fromEntries(Object.entries(qFilter).filter(([_, v]) => v != 'undefined'))
    return await axios.get(`/elsevier/scopusList`, { params: { limit, offset, search, filter } })
  },
  async getSubjectsList() {
    return await axios.get(`/elsevier/subjects`)
  },
  async getScopusIssn(id: string | string[]) {
    return await axios.get(`/elsevier/publisher/${id}`)
  }
}
