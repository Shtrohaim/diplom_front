import axios from '@/http/axios'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  async getScopusData(
    limit = 10 as number,
    offset = 1 as number,
    search = {} as { type: string; field: string },
    queryFilter = {} as any
  ) {
    const filter = Object.fromEntries(
      Object.entries(queryFilter).filter(([_, v]) => v != 'undefined')
    )
    return await axios.get(`/elsevier/scopusList`, { params: { limit, offset, search, filter } })
  },
  async getSubjectsList() {
    return await axios.get(`/elsevier/subjects`)
  },
  async getScopusIssn(id: string | string[]) {
    return await axios.get(`/elsevier/publisher/${id}`)
  }
}
