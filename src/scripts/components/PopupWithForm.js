
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this.form = this.popupElement.querySelector('.form');
    this._inputList = this.form.querySelectorAll('.form__item');
    this._submitButton = this.popupElement.querySelector('.form__submit')
  }

  _getInputValues() {
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
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues())
      this.closePopup();
    });
  }

  //Изменение надписи кнопки сабмита во время ожидания загрузки
  changeButtonText(firstText) {
    this._submitButton.textContent = firstText;
  }

closePopup() {
    super.closePopup();
    this.form.reset();
  }
}
