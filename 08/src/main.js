import './styles/style.scss'
import { Lancamento } from './entities/Lancamento'
import { Mes } from './entities/Mes'
import { Ano } from './entities/Ano'
import { formatarDinheiro } from './misc/utils'

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
    const tabelaLancamentos = document.createElement('table')
    tabelaLancamentos.className = "lancamentos"
    
    const linhaTitulo = document.createElement('tr')
    addElement(linhaTitulo, 'th', 'Categoria')
    addElement(linhaTitulo, 'th', 'Valor')
    tabelaLancamentos.appendChild(linhaTitulo)

    for (const lancamento of mes.lancamentos) {
      const linhaLancamento = document.createElement('tr')
      addElement(linhaLancamento, 'td', lancamento.categoria)
      addElement(linhaLancamento, 'td', formatarDinheiro(lancamento.valor))
      tabelaLancamentos.appendChild(linhaLancamento)
    }

    const linhaJuros = document.createElement('tr')
    addElement(linhaJuros, 'th', 'Juros')
    addElement(linhaJuros, 'th', formatarDinheiro(mes.totalizador.juros))
    tabelaLancamentos.appendChild(linhaJuros)

    const linhaRendimento = document.createElement('tr')
    addElement(linhaRendimento, 'th', 'Rendimentos')
    addElement(linhaRendimento, 'th', formatarDinheiro(mes.totalizador.rendimentos))
    tabelaLancamentos.appendChild(linhaRendimento)

    const linhaSaldo = document.createElement('tr')
    addElement(linhaSaldo, 'th', 'Total')
    addElement(linhaSaldo, 'th', formatarDinheiro(mes.totalizador.saldo))
    tabelaLancamentos.appendChild(linhaSaldo)
    
    painel.appendChild(tabelaLancamentos)
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