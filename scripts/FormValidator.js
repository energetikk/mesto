import {validationConfig} from './index.js';

export class FormValidator {
  constructor(validationConfig, currentFormSelector) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._currentFormSelector = currentFormSelector;
  }

  enableValidation() {
    this._addInputListener(this._currentFormSelector, validationConfig);
    document.querySelector(this._currentFormSelector).addEventListener('submit', (evt) => {
      evt.preventDefault()});
    document.querySelector(this._currentFormSelector).addEventListener('input', () => {
      this._toggleButton();

    });
    // document.querySelector('.form_addprofile').addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
    //   setTimeout(() => {  // добавим таймаут, чтобы `toggleButto` вызвался уже после сохранения формы
    //     this._toggleButton(), 0 });
    // });
    };

  // Функция навешивания события "input" на импуты формы
  _addInputListener() {
      const inputItem = Array.from(document.querySelectorAll(this._inputSelector));
      inputItem.forEach(item => {
        item.addEventListener('input', (evt) => {
          this._handleFormInput(evt);
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
    this._submitButton = document.querySelector(this._currentFormSelector).querySelector(this._submitButtonSelector);
    console.log(this._submitButton);
    console.log(this);
    const isValidForm = document.querySelector(this._currentFormSelector).checkValidity();
    console.log(isValidForm);
    this._submitButton.disabled = !isValidForm;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValidForm);
  };
};




