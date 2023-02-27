const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'popup__error_visible'
};


class FormValidator {
  constructor(validationConfig, currentFormSelector) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._currentFormSelector = currentFormSelector;
  }
  // _disableSubmitDefault() {
  //   this.preventDefault()
  // }

  enableValidation() {
    // const formList = document.querySelectorAll(config.formSelector);
    // console.log(formList);
    // formList.forEach(function (form) {
    this._addInputListener(this._currentFormSelector, validationConfig);
    document.querySelector(this._currentFormSelector).addEventListener('submit', (evt) => {
      evt.preventDefault()});
      document.querySelector(this._currentFormSelector).addEventListener('input', () => {
      this._toggleButton();

    });
    document.querySelector(this._currentFormSelector).addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
      setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
        toggleButton(inputList, buttonElement, settings), 0 })
    })
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
    console.log(this);
      if (!inputTarget.validity.valid) {
        inputTarget.classList.add(this._inputErrorClass);
        errorImput.textContent = inputTarget.validationMessage;
        errorImput.classList.remove(this._errorClass);
      } else {
          inputTarget.classList.remove(this._inputErrorClass);
          errorImput.textContent = '';
        };
  }

  //Переключение кнопки Submit в завистимости от валидации
  _toggleButton() {
    this._submitButton = document.querySelector(this._currentFormSelector).querySelector(this._submitButtonSelector);
    console.log(this._submitButton);
    console.log(this);
    const isValidForm = document.querySelector(this._currentFormSelector).checkValidity();
    console.log(isValidForm);
    this._submitButton.disabled = !isValidForm;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValidForm);
  }

}

const validationProfile = new FormValidator(validationConfig, '.form');
validationProfile.enableValidation();

const validationNewLocation = new FormValidator(validationConfig, '.form_addprofile');
validationNewLocation.enableValidation();
///////////////////


// const validationConfig = {
//     formSelector: '.form',
//     inputSelector: '.form__item',
//     submitButtonSelector: '.form__submit',
//     inactiveButtonClass: 'form__submit_disabled',
//     inputErrorClass: 'form__item_type_error',
//     errorClass: 'popup__error_visible'
// };
// // Отмена стандартного поведения сабмита
// function disableSubmitDefault(evt) {
//   evt.preventDefault();
// };

// function enableValidation (config) {
//   const formList = document.querySelectorAll(config.formSelector);
//   console.log(formList);
//   formList.forEach(function (form) {
//   addInputListener(form, config);
//   form.addEventListener('submit', disableSubmitDefault);
//   form.addEventListener('input', (evt) => {
//     toggleButton(form, config);
//   });
//   form.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
//     setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
//       toggleButtonState(inputList, buttonElement, settings), 0 })
//   })
// });
// };

// enableValidation(validationConfig);

// // Функция навешивания события "input" на импуты формы
// function addInputListener(form, config) {
//   const inputItem = Array.from(document.querySelectorAll(config.inputSelector));
//   inputItem.forEach(function (item) {
//     item.addEventListener('input', (evt) => {
//       handleFormInput(evt, config)
//     });
//   });
// };

// //Функция создания текста ошибки валидации инпута
// function handleFormInput(evt, config) {
//   const inputTarget = evt.target;
//   const errorImput = document.querySelector(`#${inputTarget.id}-error`);
//     if (!evt.target.validity.valid) {
//       inputTarget.classList.add(config.inputErrorClass);
//       errorImput.textContent = inputTarget.validationMessage;
//       errorImput.classList.remove(config.errorClass);
//     } else {
//         inputTarget.classList.remove(config.inputErrorClass);
//         errorImput.textContent = '';
//       };
// };

// //Переключение кнопки Submit в завистимости от валидации
// function toggleButton(form, config) {
//   const submitButton = form.querySelector(config.submitButtonSelector);
//   console.log(submitButton);
//   const isValidForm = form.checkValidity();
//   console.log(isValidForm);
//   submitButton.disabled = !isValidForm;
//   submitButton.classList.toggle(config.inactiveButtonClass, !isValidForm);
// };
