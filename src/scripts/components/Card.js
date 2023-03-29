export class Card {
  constructor(data, templateSelector, handleCardClick, userId, {handleDeleteIconClick}) {
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._ownerId = data.owner._id
    this._userId = userId;
    this._cardId = data._id;
    this._handleDeleteIconClick = handleDeleteIconClick;
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

    // console.log(this._ownerId !== this._userId)
    // console.log(this._userId)

    if (this._ownerId !== this._userId) {
      // if (this._ownerId !== 'c7d1d743525468e2b49c0fef') {
        this._deleteCardButton.remove();
      }
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
      // this._handleDeleteCardClick();
      this._handleDeleteIconClick(this._cardId);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  _handleDeleteCardClick() {
    this._element.remove();
    this._element = null;
  }

  deleteCard() {
      this._element.remove();
      this._element = null;
    }



  _checkOwnerCard() {
    if (this._ownerID !== user._id) {
      this._deleteCardButton.addEventListener('click', () => {
        this._handleDeleteCardClick();
      });
    } else {
      this._element.classList.remove('places__card-delete')
    }

  }




};
