const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'popup__error_visible'
};
// Отмена стандартного поведения сабмита
function disableSubmitDefault(evt) {
  evt.preventDefault();
};

function enableValidation (config) {
  const formList = document.querySelectorAll(config.formSelector);
  console.log(formList);
  formList.forEach(function (form) {
  addInputListener(form, config);
  form.addEventListener('submit', disableSubmitDefault);
  form.addEventListener('input', (evt) => {
    toggleButton(form, config);
  });
});
};

enableValidation(validationConfig);

// Функция навешивания события "input" на импуты формы
function addInputListener(form, config) {
  const inputItem = Array.from(document.querySelectorAll(config.inputSelector));
  inputItem.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config)
    });
  });
};

//Функция создания текста ошибки валидации инпута
function handleFormInput(evt, config) {
  const inputTarget = evt.target;
  const errorImput = document.querySelector(`#${inputTarget.id}-error`);
    if (!evt.target.validity.valid) {
      inputTarget.classList.add(config.inputErrorClass);
      errorImput.textContent = inputTarget.validationMessage;
      errorImput.classList.remove(config.errorClass);
    } else {
        inputTarget.classList.remove(config.inputErrorClass);
        errorImput.textContent = '';
      };
};

//Переключение кнопки Submit в завистимости от валидации
function toggleButton(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  console.log(submitButton);
  const isValidForm = form.checkValidity();
  console.log(isValidForm);
  submitButton.disabled = !isValidForm;
  submitButton.classList.toggle(config.inactiveButtonClass, !isValidForm);
};
