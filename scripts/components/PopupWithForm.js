
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    // this._form = this.popupElement.querySelector('.form');
    console.log(this.popupElement);
    // console.log(this._form);
  }

  _getInputValues() {

  this._inputList = this.popupElement.querySelectorAll('.form__item');
  console.log(this._inputList);

  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach((input) => {
    this._formValues[input.name] = input.value;
  });

  // возвращаем объект значений
  return this._formValues;
  // console.log(this._formValues);

  }

  setEventListeners() {
    super.setEventListeners();

    this.popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleSubmitForm(this._getInputValues());
      console.log(this._getInputValues());
    });

  }

  closePopup() {
    super.closePopup();
    // this.popupElement.querySelector('.form').reset();
  }

}
