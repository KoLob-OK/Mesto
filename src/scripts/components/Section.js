export default class Section {
  constructor({renderer}, sectionSelector) {
    this._renderer = renderer;
    this._section = document.querySelector(sectionSelector);
  }

  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  addItem(element, isInversed) {
    if (isInversed) {
      this._section.prepend(element);
    } else {
      this._section.append(element);
    }
  }
}
