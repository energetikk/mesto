import {Card} from './components/Card.js';
import {FormValidator} from './FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import {initialCards} from './utils/constants.js'
import {validationConfig} from './utils/constants.js'

// Находим и создаем элементы
const placesPhotoCards = document.querySelector('.places__photo-cards');
const popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
const popupAddProfile = document.querySelector('.popup_addprofile');
const popupSubmitAddProfile = popupAddProfile.querySelector('.form__submit');
const nameInputForm = popupAddProfile.querySelector('.form__item_place_name');
const linkInputForm = popupAddProfile.querySelector('.form__item_place_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddButton = document.querySelector('.profile__addbutton');
const popupEditProfile = document.querySelector('.popup_editprofile');
const formEditProfile = document.querySelector('.form_editProfile');
const nameInput = formEditProfile.querySelector('.form__item_el_name');
const jobInput = formEditProfile.querySelector('.form__item_el_job');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupCloseBtns = document.querySelectorAll('.popup__button-close');
const locationCardFullscreen = popupCardFullscreen.querySelector('.popup__card-location');
const photoCardFullscreen = popupCardFullscreen.querySelector('.popup__card-photo');
const popupList = document.querySelectorAll('.popup');
const formAddProfile = document.querySelector('.form_addprofile');

const sectionCard = new Section({data: initialCards, renderer:
   (item) => {
    const card = new Card(item, '#template-cards', handleCardClick);
    const cardElement = card.generateCard();
    sectionCard.addItem(cardElement);}
    }, '.places__photo-cards');

//Отрисовка карточек
sectionCard.renderItems();


//////////////////////////////////////////////////////////////////

/*
// Создание карточки пользователем как элементов класса Card
popupAddProfile.addEventListener('submit', () => {
  const newCard = {name: nameInputForm.value, link: linkInputForm.value};
  placesPhotoCards.prepend(createCard(newCard));
  closePopup(popupAddProfile);
  formAddProfile.reset();
});



function createCard(name, link) {
  const cardElement = new Card({name, link}, '#template-cards', popupFull.openPopup).generateCard()
  return cardElement
}

function renderElement(name, link) {
  placesPhotoCards.prepend( createCard(name, link) );
}

const section11 = new Section({items: initialCards, renderer: renderElement}, '.elements__list');
section11.renderItems();
*/





///////////////////////////////////////////////////////////////////
const editProfile = new Popup ('.popup_editprofile');
buttonEditProfile.addEventListener('click', () => {
  editProfile.openPopup();
});
editProfile.setEventListeners();


const addProfile = new Popup ('.popup_addprofile');
profileAddButton.addEventListener('click', () => {
  addProfile.openPopup();
});
addProfile.setEventListeners();


const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job'});
console.log(userInfo.getUserInfo())


const {name, job} = userInfo.getUserInfo();
nameInput.value = name;
jobInput.value = job;


function handleCardClick(name, link) {
  const popupFull = new PopupWithImage('.popup_cardfullscreen')
  popupFull.openPopup(name, link)
  popupFull.setEventListeners()
  }



//создание экземпляра класса PopupWithForm редактирование профиял
const popupProfileEdit = new PopupWithForm({popupSelector: '.popup_editprofile', handleSubmitForm: (formData) => {
  userInfo.setUserInfo(formData);
  popupProfileEdit.closePopup();
}});
popupProfileEdit.setEventListeners();


//создание экземпляра класса PopupWithForm добавления новой карточки профиля
const popupFormAddProfile = new PopupWithForm ({popupSelector: '.popup_addprofile', handleSubmitForm:
  (formData) => {
  sectionCard.renderItems(formData);

  popupFormAddProfile.closePopup();
}});
popupFormAddProfile.setEventListeners()







//Создание инстансов класса валидации форм
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

const validationNewLocation = new FormValidator(validationConfig, formAddProfile);
validationNewLocation.enableValidation();

export {photoCardFullscreen, locationCardFullscreen};
export {popupCardFullscreen, handleCardClick};










// buttonclose.addEventListener('click', () => {
//   //     closePopup(popup);


// //Функция создания инстасов класса Card
// function createCard(element) {
//   const card = new Card(element, '#template-cards');
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// //Создание 6-ти стартовых карточек как элементов класса Card
// initialCards.forEach((element) => {
//   placesPhotoCards.prepend(createCard(element));
// });

//Создание карточки пользователем как элементов класса Card
// popupAddProfile.addEventListener('submit', () => {
//   const newCard = {name: nameInputForm.value, link: linkInputForm.value};
//   placesPhotoCards.prepend(createCard(newCard));
//   closePopup(popupAddProfile);
//   formAddProfile.reset();
// });

// //Универсальная функция открытие попапов
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEsc);
// };

// // Универсальная функция закрытия попапов
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEsc);
// };

// //Закрытие попапов по крестику
// popupCloseBtns.forEach((buttonclose) => {
//   const popup = buttonclose.closest('.popup');
//   buttonclose.addEventListener('click', () => {
//     closePopup(popup);
//   });
// });

// //Попап добавления профиля
// function addProfile() {
//   formAddProfile.reset();
//   validationNewLocation.resetValidation();
//   openPopup(popupAddProfile);
// };
// profileAddButton.addEventListener('click', addProfile);

// //Редактирование профиля
// function editButton() {
//   openPopup(popupEditProfile);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// };
// buttonEditProfile.addEventListener('click', editButton);

// function handleFormSubmit () {
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// };
// formEditProfile.addEventListener('submit', handleFormSubmit);

// //Закрытие попапов по оверлею
// popupList.forEach(item => {
//   item.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//        closePopup(evt.target);
//     };
//   });
// });

// // Закрытие попапов по кнопке эскейп
// function closeByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   };
// };

//Объект с настройками для валидации форм
// const validationConfig = {
//   formSelector: '.form',
//   inputSelector: '.form__item',
//   submitButtonSelector: '.form__submit',
//   inactiveButtonClass: 'form__submit_disabled',
//   inputErrorClass: 'form__item_type_error',
//   errorClass: 'popup__error_visible'
// };


