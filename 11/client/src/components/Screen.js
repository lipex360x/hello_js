import { Ano } from "../entities/Ano"
import { Lancamento } from "../entities/Lancamento"
import { Mes } from "../entities/Mes"
import { formatarDinheiro } from "../misc/utils"
import { Chart } from "./app/Chart"
import { Div } from "./base/Div"
import { Header } from "./base/Header"
import { Table } from "./base/Table"
import { Button } from "./form/Button"
import { Input } from "./form/Input"
import { Select } from "./form/Select"

export class Screen {
  constructor () {
    this.init()
  }

  async init () {
    const response = await fetch("http://localhost:3000/api/lancamentos")
    const lancamentos = await response.json()
    const ano = new Ano()
    ano.adicionarMes(new Mes('Janeiro'))
    ano.adicionarMes(new Mes('Fevereiro'))
    ano.adicionarMes(new Mes('Março'))
    for (const lancamento of lancamentos) {
      ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.categoria, lancamento.tipo, parseFloat(lancamento.valor)))
    }
    ano.calcularSaldo()
    this.ano = ano
    this.renderizar()
  }

  async adicionarLancamento() {
    const inputMes = document.getElementById('mes')
    const selectTipo = document.getElementById('tipo') 
    const inputCategoria = document.getElementById('categoria') 
    const inputValor = document.getElementById('valor')
    const lancamento = new Lancamento(inputCategoria.value, selectTipo.value, parseFloat(inputValor.value))
    this.ano.adicionarLancamento(inputMes.value, lancamento)
    await fetch('http://localhost:3000/api/lancamentos', { 
      method: 'post',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        mes: inputMes.value,
        tipo: selectTipo.value,
        categoria: inputCategoria.value,
        valor: parseFloat(inputValor.value)
      })
    })
    inputMes.value = ""
    selectTipo.value = ""
    inputValor.value = ""
    inputCategoria.value = ""
    this.ano.calcularSaldo()
    this.renderizar()
  }

  renderizar () {
    document.getElementById('app').remove()
    const app = new Div('app')
    if (app.firstChild) app.firstChild.remove()
    const titulo = new Header('h2', 'Finanças Pessoais')
    app.addChildElement(titulo.element)
    const form = new Div('', 'formulario')
    const selectMes = new Select('mes')
    const selectTipo = new Select('tipo')
    selectTipo.addOption('', 'selecione')
    selectTipo.addOption('receita', 'receita')
    selectTipo.addOption('despesa', 'despesa')
    form.addChildElement(selectMes.element)
    selectMes.addOption('', 'selecione')
    for (const mes of this.ano.meses) {
      selectMes.addOption(mes.nome, mes.nome)
    }
    form.addChildElement(selectTipo.element)
  
    const inputCategoria = new Input('categoria', 'text', 'categoria')
    form.addChildElement(inputCategoria.element)
    const inputValor = new Input('valor', 'number', 'valor')
    form.addChildElement(inputValor.element)
    const button = new Button('button', 'Adicionar Transação')
    button.addListener(() => this.adicionarLancamento())
    form.addChildElement(button.element)
    app.addChildElement(form.element)
    const grafico = new Chart('teste','teste')
  
    for (const mes of this.ano.meses) {
      grafico.addColumn(mes.totalizador.saldo, mes.nome)
    }
    app.addChildElement(grafico.element)
    for (const mes of this.ano.meses) {
      const nomeDoMes = new Header('h3', mes.nome)
      app.addChildElement(nomeDoMes.element)
      const tabelaLancamentos = new Table('lancamentos')
      tabelaLancamentos.addRow('th', ['Categoria', 'Valor'])
      for (const lancamento of mes.lancamentos) {
        tabelaLancamentos.addRow('td', [lancamento.categoria, formatarDinheiro(lancamento.getValorText())])
      }
      tabelaLancamentos.addRow('th', ['Juros', formatarDinheiro(mes.totalizador.juros)])
      tabelaLancamentos.addRow('th', ['Rendimentos', formatarDinheiro(mes.totalizador.rendimentos)])
      tabelaLancamentos.addRow('th', ['Total', formatarDinheiro(mes.totalizador.saldo)])
      app.addChildElement(tabelaLancamentos.element)
    }
    const [body] = document.getElementsByTagName('body')
    body.appendChild(app.element)
  }
}