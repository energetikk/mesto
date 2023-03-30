export class Card {
  constructor(data, templateSelector, handleCardClick, userId, {handleDeleteIconClick, likeDelete, likeAdd}) {
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._ownerId = data.owner._id
    this._userId = userId;
    this._cardId = data._id;
    this._likes = data.likes
    this._likeDelete = likeDelete;
    this._likeAdd = likeAdd;


    this._liked = data.likes.find((user) => user._id === userId);

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

    this._likesCounter = this._element.querySelector('.places__like-counter');


    // this._likesCounter.textContent = this._likes.length;

    if (this._likes.length > 0) {
      this._likesCounter.textContent = this._likes.length;

      } if (this._likes.length === 0) {
        this._likesCounter.textContent = '';
      }




    if (this._ownerId !== this._userId)
        this._deleteCardButton.remove();

    this._cardIsLiked();


    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      // this._handleLikeClick();
      console.log(this._likeButton.classList.contains('places__button-like_active'))
      if (this._likeButton.classList.contains('places__button-like_active')) {
        this._likeDelete(this._cardId);
      } else {
        this._likeAdd(this._cardId);
      }
    });
    this._deleteCardButton.addEventListener('click', () => {
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

  setLikesCount(arr) {
    this._likes = arr.likes;
    if (this._likes.length > 0) {
    this._likesCounter.textContent = this._likes.length;

    } else {
      this._likesCounter.textContent = '';
    }
    this._likeButton.classList.toggle("places__button-like_active");
  }

  _cardIsLiked() {
    if (this._liked) {
      this._likeButton.classList.add("places__button-like_active");
    }
  }

};
