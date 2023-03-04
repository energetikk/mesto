export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = form;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  // Функция отмены по умолчанию обновления страницы при нажатии на Submit
  _setFormPreventDefault() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  // Функция валидации форм
  enableValidation() {
    this._setFormPreventDefault();
    this._addInputListener();
  };

  // Функция навешивания события "input" на импуты формы
  _addInputListener() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
        this._toggleButton();
      });
    });
  };

  //Переключение кнопки Submit в завистимости от валидации
  _toggleButton() {
    const isValidForm = this._formElement.checkValidity();
    this._submitButton.disabled = !isValidForm;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValidForm);
  };

  // Показать ошибку
  _showInputError(inputElement, errorMessage) {
    const errorInput = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorInput.textContent = errorMessage;
  };

  // Скрыть ошибку
  _hideInputError (inputElement) {
    const errorInput = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorInput.classList.remove(this._inputErrorClass);
    errorInput.textContent = '';
  };

  // Управлением показом или сокрытием ошибок валидации
  _handleFormInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
};


