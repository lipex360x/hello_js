import { Mes } from "./Mes"

export class Ano {
  constructor() {
    this.meses = []
  }

  adicionarMes (mes) {
    this.meses.push(mes)
  }

  adicionarLancamento (nomeDoMes, lancamento) {
    if (!this.meses.some(mes => mes.nome === nomeDoMes)) {
      this.adicionarMes(new Mes(nomeDoMes))
    }

    for(const mes of this.meses) {
      if (mes.nome === nomeDoMes) {
        mes.adicionarLancamento(lancamento)
        break
      }
    }
  }

  deletarLancamento(mes, lancamento) {
    mes.removerLancamento(lancamento)
  }

  calcularSaldo () {
    let saldoInicial = 0
    for (const mes of this.meses) {
      mes.saldoInicial = saldoInicial
      mes.calcularSaldo()
      saldoInicial = mes.totalizador.saldo
    }
  }
}