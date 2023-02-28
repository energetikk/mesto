import {photoCardFullscreen, locationCardFullscreen, openPopup, popupCardFullscreen} from './index.js'
export class Card {
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
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.places__photo').src = this._link;
    this._element.querySelector('.places__card-name').textContent = this._name;
    this._element.querySelector('.places__photo').alt = this._name;
    this._setEventListeners();
    return this._element;
  };

  _handleLikeClick() {
    this._element.querySelector('.places__button-like').classList.toggle('places__button-like_active');
  };

  _setEventListeners() {
    this._element.querySelector('.places__button-like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.places__card-delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
    });
    this._element.querySelector('.places__photo').addEventListener('click', () => {
      this._openFullScreenImage();
    });
  };

  _handleDeleteCardClick() {
    const delCard = this._element.closest('.places__element')
    delCard.remove('places__card-delete');
}
  _openFullScreenImage() {
  photoCardFullscreen.src = this._link;
  photoCardFullscreen.alt = this._name;
  locationCardFullscreen.textContent = this._name;
  openPopup(popupCardFullscreen);
  };
};
