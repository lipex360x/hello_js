import express from 'express'
import cors from 'cors'

export class HttpServer {
  
  constructor () {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors({
      origin: '*', 
      credentials: true,
      optionSuccessStatus: 200
    }))
  }

  register(method, endpoint, callback) {
    this.app[method](endpoint, async function (request, response) {
      const output = await callback(request.params, request.body)
      response.json(output)
    })
  }

  listen(port) {
    this.app.listen(port)
  }
}