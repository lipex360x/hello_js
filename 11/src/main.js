import { Connection } from './Connection'
import { LancamentoDAO } from './LancamentoDAO'
import { LancamentoController } from './LancamentoController'
import { HttpServer } from './HttpServer'

const httpServer = new HttpServer()
const connection = new Connection()
const lancamentoDAO = new LancamentoDAO(connection)
new LancamentoController(httpServer, lancamentoDAO)
httpServer.listen(3000)
