import axios from "axios"

export class AxiosAdapter {
  constructor () {
    this.register = axios.create({
      baseURL: 'http://localhost:3000'
    })
  } 
}