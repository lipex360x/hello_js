import axios from "axios"

export class AxiosAdapter {
  constructor (baseURL) {
    this.client = axios.create({ baseURL })
  }

  async get (url) {
    return this.client.get(url)
  }

  async post (url, data) {
    return this.client.post(url, data)
  }

  async delete (url) {
    return this.client.delete(url)
  }
}