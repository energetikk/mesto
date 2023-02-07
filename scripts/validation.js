const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'popup__error_visible'
}


function enableValidation (config) {
  const form = document.querySelector(config.formSelector);
  console.log(form);
  addInputListener(form, config);
}
enableValidation(validationConfig);




function addInputListener(form, config) {
  const inputItem = Array.from(document.querySelectorAll(config.inputSelector));
  inputItem.forEach((item) => {
    item.addEventListener('input', function(evt) {
      console.log(evt.target.validity.valid);
      if (!evt.target.validity.valid) {
        item.classList.add(config.inputErrorClass);
      } else {
        item.classList.remove(config.inputErrorClass);
      }
    });
  })
  console.log(inputItem);
}

