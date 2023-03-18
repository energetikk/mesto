import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardFullscreenName = this.popupElement.querySelector('.popup__card-location');
    this._popupCardFullscreenLink = this.popupElement.querySelector('.popup__card-photo');
    }

    openPopup(name, link) {
      super.openPopup();
      this._popupCardFullscreenName.textContent = name;
      this._popupCardFullscreenLink.src = link;
      this._popupCardFullscreenLink.alt = name;
    };
  }

