export class LancamentoService {
  
  constructor (client) {
    this.client = client
  }

  async getLancamentos () {
    const { data: lancamentos } = await this.client.get("/api/lancamentos")
    return lancamentos
  }

  async saveLancamento (data) {
    await this.client.post('/api/lancamentos', data)
  }

  async deleteLancamento (idLancamento) {
    await this.client.delete(`/api/lancamentos/${idLancamento}`)
  }
}