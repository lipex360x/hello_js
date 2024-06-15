export class Chart {
  constructor () {
    this.element = document.createElement('div')
    this.element.className = 'grafico'
    this.colors = ['red', 'yellow', 'green', 'blue']
  }

  addColumn (value, description) {
    const column = document.createElement('div')
    column.className = "coluna"
    const color = document.createElement('div')
    color.style.height = (value * 100) / 10000
    color.style.background = this.colors.pop()
    const nomeDoMes = document.createElement('div')
    nomeDoMes.className = 'texto'
    nomeDoMes.innerText = description
    column.appendChild(color)
    column.appendChild(nomeDoMes)
    this.element.appendChild(column)
  }
}
