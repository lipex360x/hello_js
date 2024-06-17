import { Ano } from "../entities/Ano"
import { Lancamento } from "../entities/Lancamento"
import { formatarDinheiro } from "../misc/utils"
import { Chart } from "./app/Chart"
import { Div } from "./base/Div"
import { Header } from "./base/Header"
import { Table } from "./base/Table"
import { Button } from "./form/Button"
import { Input } from "./form/Input"
import { Select } from "./form/Select"

export class Screen {
  constructor (lancamentoService) {
    this.lancamentoService = lancamentoService
    this.init()
  }

  async init () {
    const lancamentos = await this.lancamentoService.getLancamentos()
    this.ano = new Ano()
    for (const lancamento of lancamentos) {
      this.ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.idLancamento, lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor))
    }
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
    this.selectMes = new Select('mes')
    this.selectTipo = new Select('tipo')
    this.selectTipo.addOption('', 'selecione')
    this.selectTipo.addOption('receita', 'receita')
    this.selectTipo.addOption('despesa', 'despesa')
    form.addChildElement(this.selectMes.element)
    this.selectMes.addOption('', 'selecione')
    for (const mes of this.ano.meses) {
      this.selectMes.addOption(mes.nome, mes.nome)
    }
    form.addChildElement(this.selectTipo.element)
    this.inputCategoria = new Input('categoria', 'text', 'categoria')
    form.addChildElement(this.inputCategoria.element)
    this.inputValor = new Input('valor', 'number', 'valor')
    form.addChildElement(this.inputValor.element)
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
        const button = new Button("delete-lancamento", "delete")
        button.addListener(() => {
          this.deletarLancamento(mes, lancamento)
        })
        tabelaLancamentos.addRow('td', [lancamento.categoria, formatarDinheiro(lancamento.getValorText())], [button])
      }
      tabelaLancamentos.addRow('th', ['Juros', formatarDinheiro(mes.totalizador.juros)])
      tabelaLancamentos.addRow('th', ['Rendimentos', formatarDinheiro(mes.totalizador.rendimentos)])
      tabelaLancamentos.addRow('th', ['Total', formatarDinheiro(mes.totalizador.saldo)])
      app.addChildElement(tabelaLancamentos.element)
    }
    const [body] = document.getElementsByTagName('body')
    body.appendChild(app.element)
  }

  async adicionarLancamento() {
    const selectMes = this.selectMes.getValue()
    const selectTipo = this. selectTipo.getValue()
    const inputCategoria = this.inputCategoria.getValue()
    const inputValor = this.inputValor.getValue()
    console.log(selectMes, selectTipo, inputCategoria, inputValor) 
    const lancamento = Lancamento.create(selectMes, inputCategoria, selectTipo, inputValor)
    this.ano.adicionarLancamento(selectMes, lancamento)
    const lancamentoData = {
      mes: selectMes,
      tipo: selectTipo,
      categoria: inputCategoria,
      valor: inputValor
    }
    await this.lancamentoService.saveLancamento(lancamentoData)
    this.ano.calcularSaldo()
    this.renderizar()
  }

  async deletarLancamento(mes, lancamento) {
    await this.lancamentoService.deleteLancamento(lancamento.idLancamento)
    this.ano.deletarLancamento(mes, lancamento)
    this.ano.calcularSaldo()
    this.renderizar()
  }


}