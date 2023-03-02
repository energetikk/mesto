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
    this._formElement = document.querySelector(this._form);
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(document.querySelectorAll(this._inputSelector));
  }

  // Функция валидации форм
  enableValidation() {
    this._addInputListener();
  };

  // Функция навешивания события "input" на импуты формы
  _addInputListener() {
    console.log(this._inputList);
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (inputElement) => {
          this._handleFormInput(inputElement);
          this._toggleButton();
        });
      });
  };

  // //Функция создания текста ошибки валидации инпута
  // _handleFormInput(evt) {
  //   const inputTarget = evt.target;
  //   const errorInput = document.querySelector(`#${inputTarget.id}-error`);
  //   console.log(inputTarget.validity.valid);
  //     if (!inputTarget.validity.valid) {
  //       inputTarget.classList.add(this._inputErrorClass);
  //       errorInput.textContent = inputTarget.validationMessage;
  //       // errorInput.classList.remove(this._errorClass);
  //     } else {
  //         inputTarget.classList.remove(this._inputErrorClass);
  //         errorInput.textContent = '';
  //       };
  // };

  //Переключение кнопки Submit в завистимости от валидации
  _toggleButton() {
    const isValidForm = this._formElement.checkValidity();
    this._submitButton.disabled = !isValidForm;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValidForm);
  };

////////////////
  _showInputError(inputElement, errorMessage) {
    const errorInput = document.querySelector(`#${inputElement.id}-error`);

    errorInput.classList.add(this._inputErrorClass);
    // errorInput.textContent = inputElement.validationMessage;
    errorInput.textContent = errorMessage;
  };

  _hideInputError (inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    // errorInput.textContent = '';
    errorInput.textContent = '';
  };

  _handleFormInput(inputElement) {
    console.log(inputElement);
    // this.inputTarget = evt.target;
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
///////////////

};


