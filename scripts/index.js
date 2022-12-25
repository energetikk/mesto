let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__button-close');

function editButton() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closepopup() {
  popup.classList.remove('popup_opened');
}

editProfile.addEventListener('click', editButton);
// Находим форму в DOM
let formElement = popup.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
console.log(nameInput.value);
console.log(jobInput.textContent);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
console.log(profileJob);
console.log(profileName);

function handleFormSubmit (evt) {
  evt.preventDefault();
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');
  console.log(profileJob);
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', closepopup);
