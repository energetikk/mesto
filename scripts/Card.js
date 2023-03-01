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
    this._cardImage = this._element.querySelector('.places__photo');
    this._likeButton = this._element.querySelector('.places__button-like');
    this._cardName = this._element.querySelector('.places__card-name');
    this._deleteCardButton = this._element.querySelector('.places__card-delete');
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  };

  _handleLikeClick() {
    this._likeButton.classList.toggle('places__button-like_active');
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._deleteCardButton.addEventListener('click', () => {
      this._handleDeleteCardClick();
    });
      this._cardImage.addEventListener('click', () => {
      this._openFullScreenImage();
    });
  };

  _handleDeleteCardClick() {
    this._element.remove();
    this._element = null;
  }
  _openFullScreenImage() {
  photoCardFullscreen.src = this._link;
  photoCardFullscreen.alt = this._name;
  locationCardFullscreen.textContent = this._name;
  openPopup(popupCardFullscreen);
  };
};
