export class Header {
  constructor (type, text) {
    this.element = document.createElement(type)
    this.element.innerText = text
  }
}