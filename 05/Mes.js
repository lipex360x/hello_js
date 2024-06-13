class Mes {
  constructor(nome, saldoInicial) {
    if (!nome) throw new Error('Mês inválido')
    this.nome = nome
    this.saldoInicial = saldoInicial
    this.lancamentos = []
    this.totalizador = {
      saldoInicial,
      saldo: 0,
      juros: 0,
      rendimentos: 0,
      receitas: 0,
      despesas: 0,
      distribuicaoDeDespesas: [] 
    }
  }

  adicionarLancamento(lancamento) { 
    this.lancamentos.push(lancamento) 
  }

  calcularSaldo() {
    this.totalizador.saldo = this.saldoInicial
    this.apurarReceitas()
    this.apurarDespesas()
    this.distribuirDespesas()
    this.apurarJuros()
    this.apurarRendimentos()
  }

  apurarReceitas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "receita") {
        this.totalizador.saldo += lancamento.valor
        this.totalizador.receitas += lancamento.valor
      }
    }
  }

  apurarDespesas () {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === "despesa") {
        this.totalizador.saldo -= lancamento.valor
        this.totalizador.despesas += lancamento.valor
      }
    }
  }

  distribuirDespesas () {
    const distribuicaoDeDespesas = []
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo !== 'despesa') continue
      const percentual = arredondar((lancamento.valor / this.totalizador.despesas) * 100)
      distribuicaoDeDespesas.push({ categoria: lancamento.categoria, percentual })
    }
    this.totalizador.distribuicaoDeDespesas = distribuicaoDeDespesas
  }

  apurarJuros () {
    if (this.totalizador.saldo < 0) {
      this.totalizador.juros = this.calcularJuros(this.totalizador.saldo)
      this.totalizador.saldo = arredondar(this.totalizador.saldo += this.totalizador.juros)
    }
  }

  apurarRendimentos() {
    if (this.totalizador.saldo > 0) {
      this.totalizador.rendimentos = this.calcularRendimentos(this.totalizador.saldo)
      this.totalizador.saldo = arredondar(this.totalizador.saldo += this.totalizador.rendimentos)
    }
  }

  calcularJuros(valor) {
    const FATOR_JUROS = 0.1
    return arredondar(valor * FATOR_JUROS)
  }

  calcularRendimentos(valor) {
    const FATOR_RENDIMENTOS = 0.005
    return arredondar(valor * FATOR_RENDIMENTOS)
  }
}
