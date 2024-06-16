import './styles/style.scss'

import { Screen } from './components/Screen'
import { AxiosAdapter } from './components/adapters/AxiosAdapter'

const client = new AxiosAdapter()

new Screen(client.register)
