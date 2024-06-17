import cuid from 'cuid'
import { Lancamento } from './Lancamento'

export class LancamentoDAO {
  
  constructor (connection) {
    this.connection = connection
  }

  async getLancamentos () {
    const lancamentosData = await this.connection.query("select * from branas.lancamento", [])
    const lancamentos = []
    for (const lancamento of lancamentosData) {
      lancamentos.push(new Lancamento(lancamento.lancamento_id, lancamento.mes, lancamento.categoria, lancamento.tipo, parseFloat(lancamento.valor)))
    }
    return lancamentos
  }

  async saveLancamento (lancamento) {
    const id = cuid()
    await this.connection.query('insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ($1, $2, $3, $4, $5)', [ id, lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor ])
  }

  async deleteLancamento (idLancamento) {
    await this.connection.query('delete from branas.lancamento where lancamento_id = $1', [idLancamento])
  }
}
