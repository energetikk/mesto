import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
// import Popup from './components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {initialCards} from '../scripts/utils/constants.js'
import {validationConfig} from '../scripts/utils/constants.js'

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

const cardSection = new Section({data: initialCards, renderer:
   (item) => {cardSection.addItem(addNewCard(item));}
    }, '.places__photo-cards');

//Отрисовка карточек
cardSection.renderItems();

function addNewCard(item) {
  const card = new Card(item, '#template-cards',
  () => handleCardClick(item.name, item.link));
  return card.generateCard();
};

function handleCardClick(name, link) {
  const popupFull = new PopupWithImage('.popup_cardfullscreen');
  popupFull.openPopup(name, link);
  popupFull.setEventListeners()
  }

const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job'});
console.log(userInfo.getUserInfo())
const {name, job} = userInfo.getUserInfo();
nameInput.value = name;
jobInput.value = job;

//создание экземпляра класса PopupWithForm редактирование профиял
const popupProfileEdit = new PopupWithForm({popupSelector: '.popup_editprofile', handleSubmitForm:
(formData) => {
  userInfo.setUserInfo(formData);
  popupProfileEdit.closePopup();
  validationProfile.resetValidation();
}});
popupProfileEdit.setEventListeners();

//создание экземпляра класса PopupWithForm добавления новой карточки профиля
const popupFormAddProfile = new PopupWithForm ({popupSelector: '.popup_addprofile', handleSubmitForm:
(formData) => {
  cardSection.renderNewCard(formData);
  popupFormAddProfile.closePopup();
  formAddProfile.reset();
}});
popupFormAddProfile.setEventListeners()

//Открытие попапа редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupProfileEdit.openPopup();
});
popupProfileEdit.setEventListeners();


//Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  popupFormAddProfile.openPopup();
});

//Создание инстансов класса валидации форм
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

const validationNewLocation = new FormValidator(validationConfig, formAddProfile);
validationNewLocation.enableValidation();

export {photoCardFullscreen, locationCardFullscreen};
export {popupCardFullscreen, handleCardClick};

