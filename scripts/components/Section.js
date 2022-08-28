export default class Section {
  constructor({items, renderer}, sectionSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._sectionSelector.prepend(element);
  }

}
