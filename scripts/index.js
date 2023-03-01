import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Добавление первых 6 карточек на страницу
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Находим и создаем элементы
const placesPhotoCards = document.querySelector('.places__photo-cards');
const templateCards = document.querySelector('#template-cards').content;
const popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
const popupAddProfile = document.querySelector('.popup_addprofile');
const popupSubmitAddProfile = popupAddProfile.querySelector('.form__submit');
const nameInputForm = popupAddProfile.querySelector('.form__item_place_name');
const linkInputForm = popupAddProfile.querySelector('.form__item_place_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddButton = document.querySelector('.profile__addbutton');
const popupAddPfofileClose = profileAddButton.querySelector('.popup__button-close');
const openPopupEditProfile = document.querySelector('.popup_editprofile');
const formElement = openPopupEditProfile.querySelector('.popup__container');
const nameInput = formElement.querySelector('.form__item_el_name');
const jobInput = formElement.querySelector('.form__item_el_job');
const editProfile = document.querySelector('.profile__edit-button');
const popupCloseBtns = document.querySelectorAll('.popup__button-close');
const locationCardFullscreen = popupCardFullscreen.querySelector('.popup__card-location');
const photoCardFullscreen = popupCardFullscreen.querySelector('.popup__card-photo');
const popupList = document.querySelectorAll('.popup');
const formAddProfile = document.querySelector('.form_addprofile');

//Создание 6-ти стартовых карточек как элементов класса Card
initialCards.forEach((item) => {
  const card = new Card(item, '#template-cards');
  const cardElement = card.generateCard();
  placesPhotoCards.prepend(cardElement);
});

//Создание карточки пользователем как элементов класса Card
popupAddProfile.addEventListener('submit', () => {
  const newCard = {name: nameInputForm.value, link: linkInputForm.value};
  const userCard = new Card(newCard, '#template-cards');
  const userCardElement = userCard.generateCard();
  placesPhotoCards.prepend(userCardElement);
  closePopup(popupAddProfile);
  formAddProfile.reset();
});

//Универсальная функция открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

// Универсальная функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

//Закрытие попапов по крестику
popupCloseBtns.forEach((buttonclose) => {
  buttonclose.addEventListener('click', (evt) => {
    const popups = evt.target.closest('.popup');
    closePopup(popups);
  });
});

//Попап добавления профиля
function addProfile() {
  openPopup(popupAddProfile);
  popupSubmitAddProfile.disabled = true;
  popupSubmitAddProfile.classList.add('form__submit_disabled');
};
profileAddButton.addEventListener('click', addProfile);

//Редактирование профиля
function editButton() {
  openPopup(openPopupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

editProfile.addEventListener('click', editButton);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(openPopupEditProfile);
};
formElement.addEventListener('submit', handleFormSubmit);

//Закрытие попапов по оверлею
popupList.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
       closePopup(evt.target);
    };
});
});

// Закрытие попапов по кнопке эскейп
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//Объект с настройками для валидации форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'popup__error_visible'
};

//Создание инстансов класса валидации форм
const validationProfile = new FormValidator(validationConfig, '.form');
validationProfile.enableValidation();
const validationNewLocation = new FormValidator(validationConfig, '.form_addprofile');
validationNewLocation.enableValidation();

export {validationConfig, photoCardFullscreen, locationCardFullscreen, popupCardFullscreen, openPopup};
