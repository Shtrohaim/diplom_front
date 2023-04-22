import axios from '@/http/axios'

export default {
  async getFipiInfo(examName: string | string[]) {
    return await axios.get(`/${examName}`)
  }
}
