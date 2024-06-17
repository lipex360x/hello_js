import { Button } from "../form/Button"

export class Table {
  constructor (className) {
    this.element = document.createElement('table')
    this.element.className = className
  }

  addRow (type, values, buttons = []) {
    const tr = document.createElement('tr')
    for (const value of values) {
      const td = document.createElement(type)
      td.innerText = value
      tr.appendChild(td)
    }

    for (const button of buttons) {
      const td = document.createElement(type)
      td.appendChild(button.element)
      tr.appendChild(td)
    }

    this.element.appendChild(tr)
  }
}