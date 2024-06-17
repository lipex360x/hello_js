export class Lancamento {
  constructor(idLancamento, mes, categoria, tipo, valor) {
    if (tipo !== "receita" && tipo !== "despesa") throw new Error('Tipo inválido [receita / despesa]')
    if (valor <= 0) throw new Error('Valor precisa ser um número positivo')
    if (!categoria) throw new Error('Categoria deve ser informada')
    this.idLancamento = idLancamento
    this.mes = mes
    this.categoria = categoria
    this.tipo = tipo
    this.valor = valor
  }

  getValorText () {
    return this.tipo === 'receita' ? this.valor : this.valor * -1
  }
}