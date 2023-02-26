class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

  }

  _getTemplate() {
    const cardsElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.places__element')
    .cloneNode(true);

    return cardsElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.places__photo').src = this._link;
    this._element.querySelector('.places__card-name').textContent = this._name;
    this._element.querySelector('.places__photo').alt = this._name;
    return this._element;
  }

}


initialCards.forEach((item) => {
  const card = new Card(item, '#template-cards');
  const cardElement = card.generateCard(item);
  placesPhotoCards.prepend(cardElement);
});

