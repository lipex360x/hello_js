import './styles/style.scss'
import { Lancamento } from './entities/Lancamento'
import { Mes } from './entities/Mes'
import { Ano } from './entities/Ano'
import { formatarDinheiro } from './misc/utils'
import { Table } from './components/Table'

const janeiro = new Mes('Janeiro')
janeiro.adicionarLancamento(new Lancamento("Salário", "receita", 3000 ))
janeiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1000 ))

const fevereiro = new Mes("Fevereiro")
fevereiro.adicionarLancamento(new Lancamento("Salário", "receita", 3000))
fevereiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200))

const marco = new Mes("Março")
marco.adicionarLancamento(new Lancamento("Salário", "receita", 4000))
marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200))

const abril = new Mes ("Abril")

const ano = new Ano()
ano.adicionarMes(janeiro)
ano.adicionarMes(fevereiro)
ano.adicionarMes(marco)
ano.adicionarMes(abril)
ano.calcularSaldo()

function addElement (parent, elementType, text) {
  const element = document.createElement(elementType)
  if (text) element.innerText = text
  parent.appendChild(element)
}

function renderizar () {
  const cores = ['red', 'yellow', 'green', 'blue']
  const app = document.getElementById('app')
  if (app.firstChild) app.firstChild.remove()
  const painel = document.createElement("div")
  
  const grafico = document.createElement('div')
  grafico.className = 'grafico'
  
  for (const mes of ano.meses) {
    const coluna = document.createElement('div')
    coluna.className = "coluna"
    const cor = document.createElement('div')
    cor.style.height = (mes.totalizador.saldo * 100) / 10000
    cor.style.background = cores.pop()
    const nomeDoMes = document.createElement('div')
    nomeDoMes.className = 'texto'
    nomeDoMes.innerText = mes.nome
    coluna.appendChild(cor)
    coluna.appendChild(nomeDoMes)
    grafico.appendChild(coluna)
  }

  painel.append(grafico)
  
  for (const mes of ano.meses) {
    addElement(painel, 'h3', mes.nome)
    const tabelaLancamentos = new Table('lancamentos')
    tabelaLancamentos.addRow('th', ['Categoria', 'Valor'])
    for (const lancamento of mes.lancamentos) {
      tabelaLancamentos.addRow('td', [lancamento.categoria, formatarDinheiro(lancamento.getValorText())])
    }
    tabelaLancamentos.addRow('th', ['Juros', formatarDinheiro(mes.totalizador.juros)])
    tabelaLancamentos.addRow('th', ['Rendimentos', formatarDinheiro(mes.totalizador.rendimentos)])
    tabelaLancamentos.addRow('th', ['Total', formatarDinheiro(mes.totalizador.saldo)])
    painel.appendChild(tabelaLancamentos.element)
  }
  app.appendChild(painel)
}
renderizar()

function adicionarLancamento() {
  const inputMes = document.getElementById('mes')
  const selectTipo = document.getElementById('tipo') 
  const inputCategoria = document.getElementById('categoria') 
  const inputValor = document.getElementById('valor')
  const lancamento = new Lancamento(inputCategoria.value, selectTipo.value, parseFloat(inputValor.value))
  ano.adicionarLancamento(inputMes.value, lancamento)
  inputMes.value = ""
  selectTipo.value = ""
  inputValor.value = ""
  inputCategoria.value = ""
  ano.calcularSaldo()
  renderizar()
}

function formulario () {
  const selectMes = document.getElementById('mes')
  for (const mes of ano.meses) {
    const option = document.createElement('option')
  option.text = mes.nome
  selectMes.add(option)
  }

  const botao = document.getElementById("botao")
  botao.addEventListener("click", adicionarLancamento)
}

formulario()