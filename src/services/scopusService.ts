import axios from '../http/axios'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  getScopusData(
    limit = 10 as number,
    offset = 1 as number,
    search = {} as { type: string; field: string },
    queryFilter = {} as any
  ) {
    const filter = Object.fromEntries(
      Object.entries(queryFilter).filter(([_, v]) => v != 'undefined')
    )
    return axios.get(`/elsevier/scopusList`, { params: { limit, offset, search, filter } })
  },
  getSubjectsList() {
    return axios.get(`/elsevier/subjects`)
  },
  getScopusIssn(id: string | string[]) {
    return axios.get(`/elsevier/publisher/${id}`)
  }
}
