import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
    this._popupCardFullscreenName = this._popupCardFullscreen.querySelector('.popup__card-location');
    this._popupCardFullscreenLink = this._popupCardFullscreen.querySelector('.popup__card-photo');
    }

    openPopup(name, link) {
      super.openPopup();
      this._popupCardFullscreenName.textContent = name;
      this._popupCardFullscreenLink.src = link;
      this._popupCardFullscreenLink.alt = name;
    };
  }

