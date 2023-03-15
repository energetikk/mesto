
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {

  this._inputList = this.popupElement.querySelectorAll('.form__item');

  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach((input) => {
    this._formValues[input.name] = input.value;
  });

  // возвращаем объект значений
  return this._formValues;

  }

  setEventListeners() {
    super.setEventListeners();

    this.popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
  }
}
