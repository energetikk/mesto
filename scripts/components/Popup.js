export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.buttonCloseAll = document.querySelectorAll('.popup__button-close');
  }

//Универсальная функция открытие попапов
  openPopup() {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }
    );
};

//Универсальная функция закрытия попапов
  closePopup() {
    this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }
    );
};

_handleEscClose(evt) {
  if (evt.key === 'Escape') {
    this.closePopup();
}
}

//Слушатели событий клика закрытия попапа по крестику и по клику в облсти оверлея
setEventListeners() {
  this.buttonCloseAll.forEach((buttonclose) => {
      buttonclose.addEventListener('click', () => {
        this.closePopup();
      });
  })

  this.popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
           this.closePopup();
        };
      });
}
}
