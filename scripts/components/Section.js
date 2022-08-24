export default class Section {
  constructor({items, renderer}, sectionSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._sectionSelector = sectionSelector;
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._sectionSelector.prepend(element);
  }

}
