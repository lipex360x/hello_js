export class LancamentoService {
  
  constructor (httpClient) {
    this.client = httpClient
  }

  async getLancamentos () {
    const { data: lancamentos } = await this.client.get('/api/lancamentos')
    return lancamentos
  }

  async saveLancamento (lancamento) {
    await this.client.post('/api/lancamentos', lancamento)
  }

  async deleteLancamento (idLancamento) {
    await this.client.delete(`/api/lancamentos/${idLancamento}`)
  }
}
