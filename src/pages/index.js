import './index.css';
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {validationConfig} from '../scripts/utils/constants.js'
import { Api } from '../scripts/components/Api';

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
const formEditAvatar = document.querySelector('.form_editavatarprofile');
const popupFull = new PopupWithImage('.popup_cardfullscreen');
const buttonCardDelete = document.querySelectorAll('.places__card-delete')

popupFull.setEventListeners();

const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
 headers: {
  authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077',
  "Content-Type": "application/json"
  }
});

function addNewCard(item) {
  const card = new Card(item, '#template-cards',
  () => handleCardClick(item.name, item.link));
  return card.generateCard();
};
function handleCardClick(name, link) {
  popupFull.openPopup(name, link);
}

const cardSection = new Section({renderer:
  (item) => {cardSection.addItem(addNewCard(item));}
   }, '.places__photo-cards');
   api.getInitialCards()
   .then((data) => {
  cardSection.renderItems(data);
})

const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job', avatarImage: '.profile__main-photo'});

// создание экземпляра класса PopupWithForm редактирование профиля
const popupProfileEdit = new PopupWithForm({popupSelector: '.popup_editprofile', handleSubmitForm:
(formData) => {
  console.log(formData)
  api.setUserInfo(formData)
  .then((data) => {
    userInfo.setUserInfo(data);

  })

}});

popupProfileEdit.setEventListeners();

//создание экземпляра класса PopupWithForm добавления новой карточки профиля
const popupFormAddProfile = new PopupWithForm ({popupSelector: '.popup_addprofile', handleSubmitForm:
(formData) => {
  api.addCard(formData)
  .then((data) => {
    cardSection.addItem(addNewCard(data))
    popupFormAddProfile.closePopup();
  })
}});

popupFormAddProfile.setEventListeners()

//Открытие попапа редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupProfileEdit.openPopup();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  validationProfile.resetValidation();
});

//Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  validationNewLocation.resetValidation()
  popupFormAddProfile.openPopup();
});

//Создание инстансов класса валидации форм
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

const validationNewLocation = new FormValidator(validationConfig, formAddProfile);
validationNewLocation.enableValidation();


const validationEditAvatar = new FormValidator(validationConfig, formEditAvatar);
validationEditAvatar.enableValidation();

export {photoCardFullscreen, locationCardFullscreen};
export {popupCardFullscreen, handleCardClick};


//создание экземпляра класса PopupWithForm редактирование аватара пользователя
const popupFormAvatarProfile = new PopupWithForm ({popupSelector: '.popup_addavatarprofile', handleSubmitForm:
(formData) => {
  console.log(formData)
  api.setAvatar(formData)
  .then((data) => {
    console.log(data)
    // document.querySelector('.profile__main-photo').src = data.link;
    userInfo.setAvatarImage(data.avatar);
  })
  popupFormAvatarProfile.closePopup();
}
});

const editButtonAvatar = document.querySelector('.profile__edit-button-avatar');
editButtonAvatar.addEventListener('click', () => {
  popupFormAvatarProfile.openPopup();
})
popupFormAvatarProfile.setEventListeners()

// Установка начальных значений профиля
api.getUserInfo()
.then((data) => {
  console.log(data);
  userInfo.setUserInfo(data)
})

