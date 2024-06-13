class Lancamento {
  constructor(categoria, tipo, valor) {
    if (tipo !== "receita" && tipo !== "despesa") throw new Error('Tipo inválido [receita / despesa]')
    if (valor <= 0) throw new Error('Valor precisa ser um número positivo')
    if (!categoria) throw new Error('Categoria deve ser informada')
    this.categoria = categoria
    this.tipo = tipo
    this.valor = valor
  }
}