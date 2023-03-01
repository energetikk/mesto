// import {validationConfig} from './index.js';

export class FormValidator {
  constructor(validationConfig, form) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._form = form;
  }

  enableValidation() {
    this._addInputListener();
  };

  // Функция навешивания события "input" на импуты формы
  _addInputListener() {
      this._imputList = Array.from(document.querySelectorAll(this._inputSelector));
      this._imputList.forEach(item => {
        item.addEventListener('input', (item) => {
          this._handleFormInput(item);
          this._toggleButton();
        });
      });
  }

  //Функция создания текста ошибки валидации инпута
  _handleFormInput(evt) {
    const inputTarget = evt.target;
    const errorImput = document.querySelector(`#${inputTarget.id}-error`);
      if (!inputTarget.validity.valid) {
        inputTarget.classList.add(this._inputErrorClass);
        errorImput.textContent = inputTarget.validationMessage;
        errorImput.classList.remove(this._errorClass);
      } else {
          inputTarget.classList.remove(this._inputErrorClass);
          errorImput.textContent = '';
        };
  };

  //Переключение кнопки Submit в завистимости от валидации
  _toggleButton() {
    this._submitButton = document.querySelector(this._form).querySelector(this._submitButtonSelector);
    const isValidForm = document.querySelector(this._form).checkValidity();
    this._submitButton.disabled = !isValidForm;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValidForm);
  };
};




