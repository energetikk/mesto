export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    // this._api = api;
  }

addItem(element) {
  this._container.prepend(element);
}

renderNewCard(item) {
  this._renderer(item);
}

renderItems(items) {
  items.reverse().forEach((item) => {
    this._renderer(item);
  });
};
}
