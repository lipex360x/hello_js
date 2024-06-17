import './styles/style.scss'

import { Screen } from './components/Screen'
import { AxiosAdapter } from './components/adapters/AxiosAdapter'
import { LancamentoService } from './services/LantamentoService'

const client = new AxiosAdapter()
const lancamentoService = new LancamentoService(client.register)
new Screen(lancamentoService)
