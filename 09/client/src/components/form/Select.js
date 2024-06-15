export class Select {
  constructor (id) {
    this.element = document.createElement('select')
    this.element.id = id
  }

  addOption (value, text) {
    const option = document.createElement('option')
    option.value = value
    option.text = text
    this.element.appendChild(option)
  }
}