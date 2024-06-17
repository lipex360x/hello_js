import './styles/style.scss'

import { Screen } from './components/Screen'
import { AxiosAdapter } from './components/adapters/AxiosAdapter'
import { LancamentoService } from './services/LantamentoService'

const baseURL = 'http://localhost:3000'
const client = new AxiosAdapter(baseURL)
const lancamentoService = new LancamentoService(client)
new Screen(lancamentoService)
