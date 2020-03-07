export default class DomConsole {
  constructor(rootId, mockDocument) {
    this.document = mockDocument || document;
    const root = this.document.getElementById(rootId);
    this.addListTo(root);
  }

  addListTo(element) {
    this.currentList = this.document.createElement("ul");
    element.appendChild(this.currentList);
  }

  addItem(content) {
    const item = this.document.createElement("li");
    item.innerHTML = content;
    this.currentList.appendChild(item);
    return item;
  }

  log(message) {
    this.addItem(message);
  }

  error(message) {
    this.addItem(`<strong>${message}</strong>`);
  }

  group(label) {
    const item = this.addItem(label);
    this.addListTo(item);
  }

  groupEnd() {
    const parent = this.currentList.parentElement;
    if (!parent || !parent.parentElement) {
      throw new Error("Missing parent DOM element(s). Please use group().");
    }

    this.currentList = parent.parentElement;
  }
}
