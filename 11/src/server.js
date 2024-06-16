import express from 'express'
import cors from 'cors'
import cuid from 'cuid'
import { Connection } from './Connection'

const app = express()
app.use(express.json())
app.use(cors())

const connection = new Connection()

app.get('/api/lancamentos', async (request, response) => {
  const lancamentos = await connection.query("select * from branas.lancamento", [])
  response.json(lancamentos)
})

app.post('/api/lancamentos', async (request, response) => {
  const lancamento = request.body
  const id = cuid()
  await connection.query('insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ($1, $2, $3, $4, $5)', [ id, lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor ])
  response.end()
})

app.listen(3000)