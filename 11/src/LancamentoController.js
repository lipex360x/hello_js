export class LancamentoController {
  
  constructor (httpServer, lancamentoDAO) {
    httpServer.register('get', '/api/lancamentos', async (params, body) => {
      const lancamentos = await lancamentoDAO.getLancamento()
      return lancamentos
    })

    httpServer.register('post', '/api/lancamentos', async (params, body) => {
      const lancamento = body
      await lancamentoDAO.saveLancamento(lancamento)
    })

    // httpServer.register('delete', '/api/lancamentos/:idLancamento', async (params, body) => {
    //   const idLancamento = params.idLancamento
    //   await lancamentoDAO.deleteLancamento(idLancamento)
    // })
  }
}