import './style.css'

const saldoInicial = 0

const janeiro = new Mes('Janeiro')
janeiro.adicionarLancamento(new Lancamento("Salário", "receita", 3000 ))
janeiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1000 ))
// janeiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200 ))
// janeiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 150 ))
// janeiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100 ))
// janeiro.adicionarLancamento(new Lancamento("Transporte", "despesa", 340 ))
// janeiro.adicionarLancamento(new Lancamento("Lazer", "despesa", 300 ))
// janeiro.adicionarLancamento(new Lancamento("Alimentação", "despesa", 500 ))
// janeiro.adicionarLancamento(new Lancamento("Condomínio", "despesa", 300 ))
// janeiro.adicionarLancamento(new Lancamento("Farmácia", "despesa", 10))

const fevereiro = new Mes("Fevereiro")
fevereiro.adicionarLancamento(new Lancamento("Salário", "receita", 3000))
fevereiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200))
// fevereiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 100))
// fevereiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 250))
// fevereiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100))
// fevereiro.adicionarLancamento(new Lancamento("Transporte", "despesa", 300))
// fevereiro.adicionarLancamento(new Lancamento("Lazer", "despesa", 300))
// fevereiro.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000))
// fevereiro.adicionarLancamento(new Lancamento("Condomínio", "despesa", 300))

const marco = new Mes("Março")
marco.adicionarLancamento(new Lancamento("Salário", "receita", 4000))
marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200))
// marco.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 100))
// marco.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 250))
// marco.adicionarLancamento(new Lancamento("Internet", "despesa", 100))
// marco.adicionarLancamento(new Lancamento("Transporte", "despesa", 300))
// marco.adicionarLancamento(new Lancamento("Lazer", "despesa", 300))
// marco.adicionarLancamento(new Lancamento("Alimentação", "despesa", 500))
// marco.adicionarLancamento(new Lancamento("Condomínio", "despesa", 1250))
// marco.adicionarLancamento(new Lancamento("Farmácia", "despesa", 400))

const abril = new Mes ("Abril")

const ano = new Ano()
ano.adicionarMes(janeiro)
ano.adicionarMes(fevereiro)
ano.adicionarMes(marco)
ano.adicionarMes(abril)
ano.calcularSaldo()

console.log(ano.meses)

function addElement (parent, elementType, text) {
  const element = document.createElement(elementType)
  if (text) element.innerText = text
  parent.appendChild(element)
}

function renderizar () {
  const app = document.getElementById("app")
  if (app.firstChild) app.firstChild.remove()
  const painel = document.createElement("div")
  for (const mes of ano.meses) {
    addElement(painel, 'h3', mes.nome)
    for (const lancamento of mes.lancamentos) {
      const detalhesLancamento = lancamento.tipo + " " + lancamento.categoria + " " + lancamento.valor
      addElement(painel, 'p', detalhesLancamento)
    }
    addElement(painel, 'h4', mes.totalizador.saldo)
    addElement(painel, 'hr')
  }
  app.appendChild(painel)
}

renderizar()

const botao = document.getElementById("botao")
botao.addEventListener("click", adicionarLancamento)

function adicionarLancamento() {
  const inputMes = document.getElementById('mes')
  const selectTipo = document.getElementById('tipo') 
  const inputCategoria = document.getElementById('categoria') 
  const inputValor = document.getElementById('valor')
  const lancamento = new Lancamento(inputCategoria.value, selectTipo.value, parseFloat(inputValor.value))
  ano.adicionarLancamento(inputMes.value, lancamento)
  // janeiro.adicionarLancamento(new Lancamento(inputCategoria.value, selectTipo.value, parseFloat(inputValor.value)))
  inputMes.value = ""
  selectTipo.value = ""
  inputValor.value = ""
  inputCategoria.value = ""
  ano.calcularSaldo()
  renderizar()
}