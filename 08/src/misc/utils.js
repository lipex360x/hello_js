export function arredondar (valor) {
  return Math.round(valor * 100) / 100
}

export function formatarDinheiro (valor) {
  return new Intl.NumberFormat("pt-br", {currency: 'BRL', style: "currency"}).format(valor)
}