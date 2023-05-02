import axios from '@/http/axios'

export default {
  async getAllRegions() {
    return await axios.get('/allRegions')
  },

  async getRegion(query: any) {
    const { tableName, size, page, search } = query
    return await axios.get(`/table/${tableName}`, { params: { size, page, search } })
  },

  async getNews(tableName: string | string[], id: string | string[]) {
    return await axios.get(`/table/${tableName}/${id}`)
  }
}
