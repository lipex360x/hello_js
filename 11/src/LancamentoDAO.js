import cuid from 'cuid'

export class LancamentoDAO {
  
  constructor (connection) {
    this.connection = connection
  }

  async getLancamento () {
    const lancamentos = await this.connection.query("select * from branas.lancamento", [])
    return lancamentos
  }

  async saveLancamento (lancamento) {
    const id = cuid()
    await this.connection.query('insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ($1, $2, $3, $4, $5)', [ id, lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor ])
  }

  async deleteLancamento (idLancamento) {
    await this.connection.query('delte from branas.lancamento where id_lancamento = $1', [idLancamento])
  }
}
