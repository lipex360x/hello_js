import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const lancamentos = [
  { mes: 'Janeiro', categoria: "Salário", tipo: "receita", valor: 3000 },
  { mes: 'Janeiro', categoria: "Aluguel", tipo: "despesa", valor: 1000 },
  { mes: 'Fevereiro', categoria: "Salário", tipo: "receita", valor: 3000 },
  { mes: 'Fevereiro', categoria: "Aluguel", tipo: "despesa", valor: 1200 },
  { mes: 'Março', categoria: "Salário", tipo: "receita", valor: 4000 },
  { mes: 'Março', categoria: "Aluguel", tipo: "despesa", valor: 1200 },
]

app.get('/api/lancamentos', (request, response) => {
  response.json(lancamentos)
})

app.listen(3000)