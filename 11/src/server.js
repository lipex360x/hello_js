import express from 'express'
import cors from 'cors'
import { Connection } from './Connection'
import { LancamentoDAO } from './LancamentoDAO'

const app = express()
app.use(express.json())
app.use(cors())

const connection = new Connection()
const lancamentoDAO = new LancamentoDAO(connection)

app.get('/api/lancamentos', async (request, response) => {
  const lancamentos = await lancamentoDAO.getLancamento()
  response.json(lancamentos)
})

app.post('/api/lancamentos', async (request, response) => {
  const lancamento = request.body
  await lancamentoDAO.saveLancamento(lancamento)
  response.end()
})

app.listen(3000)