import './index.css';
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {validationConfig} from '../scripts/utils/constants.js'
import { Api } from '../scripts/components/Api';

// Находим и создаем элементы
// const placesPhotoCards = document.querySelector('.places__photo-cards');
// const popupAddProfile = document.querySelector('.popup_addprofile');
// const popupSubmitAddProfile = popupAddProfile.querySelector('.form__submit');
// const nameInputForm = popupAddProfile.querySelector('.form__item_place_name');
// const linkInputForm = popupAddProfile.querySelector('.form__item_place_link');
// const profileName = document.querySelector('.profile__name');
// const profileJob = document.querySelector('.profile__job');
// const popupCloseBtns = document.querySelectorAll('.popup__button-close');
// const popupEditProfile = document.querySelector('.popup_editprofile');
// const popupList = document.querySelectorAll('.popup');
// const buttonCardDelete = document.querySelector('.places__card-delete')
const popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
const profileAddButton = document.querySelector('.profile__addbutton');
const formEditProfile = document.querySelector('.form_editProfile');
const nameInput = formEditProfile.querySelector('.form__item_el_name');
const jobInput = formEditProfile.querySelector('.form__item_el_job');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const locationCardFullscreen = popupCardFullscreen.querySelector('.popup__card-location');
const photoCardFullscreen = popupCardFullscreen.querySelector('.popup__card-photo');
const formAddProfile = document.querySelector('.form_addprofile');
const formEditAvatar = document.querySelector('.form_editavatarprofile');
const editButtonAvatar = document.querySelector('.profile__edit-button-avatar');

//Создание экземпляра класса Api
const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
 headers: {
  authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077',
  "Content-Type": "application/json"
  }
});

//Присвоим переменную для получения айдишника юзера
let userId;

//Отправка запроса на сервер с исользованием ПромисОлл для получения на рендеринг начальных значений профиля и карточек на странице
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//Функция созадния карточек
function addNewCard(item, userId) {
  const card = new Card(item, '#template-cards', () => handleCardClick(item.name, item.link), userId,
  {handleDeleteIconClick: (cardId) => {
    popupConfirmDelete.openPopup();
    popupConfirmDelete.handleConfirm(() => {
      api.deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        popupConfirmDelete.closePopup()
        })
        .catch((err) => {
          console.log(err)
      })
    })
  },
  likeDelete: (cardId) => {
    api.removeLike(cardId)
    .then((data) => {
      card.setLikesCount(data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  likeAdd: (cardId) => {
    api.setLike(cardId)
    .then((data) => {
      card.setLikesCount(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  });
  return card.generateCard();
};

function handleCardClick(name, link) {
  popupFull.openPopup(name, link);
}

//Создание экземпляра класса Секшин для отображения в секции карточкек
const cardSection = new Section({renderer:
  (item) => {cardSection.addItem(addNewCard(item, userId));}
   }, '.places__photo-cards');

//Создание экз-емпляра класса информации о пользователе
const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job', avatarImage: '.profile__main-photo'});

//Создание экземпляра класса попапа открытия карточек на весь экран
const popupFull = new PopupWithImage('.popup_cardfullscreen');
popupFull.setEventListeners();


function handleSubmitFormEdit(formData) {
  // popupProfileEdit.changeButtonText('Сохранение...');
  return api.setUserInfo(formData)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupProfileEdit.closePopup()
  })
  .catch((err) => {
      console.log(err)
    })
  // .finally(() => {
  //   popupProfileEdit.changeButtonText('Сохранить')})
}

// создание экземпляра класса PopupWithForm редактирование профиля
const popupProfileEdit = new PopupWithForm({popupSelector: '.popup_editprofile', handleSubmitForm: handleSubmitFormEdit})
popupProfileEdit.setEventListeners();


function handleSubmitFormAdd(formData) {
  // popupFormAddProfile.changeButtonText('Сохранение...');
  return api.addCard(formData)
  .then((data) => {
    cardSection.addItem(addNewCard(data, userId))
    popupFormAddProfile.closePopup()
  })
  .catch((err) => {
      console.log(err)
    })
  // .finally(() => {
  //   popupFormAddProfile.changeButtonText('Сохранить')})
}

//создание экземпляра класса PopupWithForm добавления новой карточки профиля
const popupFormAddProfile = new PopupWithForm ({popupSelector: '.popup_addprofile', handleSubmitForm: handleSubmitFormAdd});
popupFormAddProfile.setEventListeners()


function handleSubmitFormAvatar(formData) {
  // popupFormAvatarProfile.changeButtonText('Сохранение...');
  return api.setAvatar(formData)
  .then((data) => {
    userInfo.setAvatarImage(data.avatar);
    popupFormAvatarProfile.closePopup()
  })
  .catch((err) => {
      console.log(err)
    })
  // .finally(() => {
  //   popupFormAvatarProfile.changeButtonText('Сохранить')})
}

//создание экземпляра класса PopupWithForm редактирование аватара пользователя
const popupFormAvatarProfile = new PopupWithForm ({popupSelector: '.popup_addavatarprofile', handleSubmitForm: handleSubmitFormAvatar})
popupFormAvatarProfile.setEventListeners();

//Создание экземпляра класса PopupWithConfirm подтверждения удаления
const popupConfirmDelete = new PopupWithConfirm ('.popup_confirm');
popupConfirmDelete.setEventListeners();

//Открытие попапа редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  popupProfileEdit.openPopup();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  validationProfile.resetValidation();
});

//Открытие попапа редактирования аватара
editButtonAvatar.addEventListener('click', () => {
  validationEditAvatar.resetValidation();
  popupFormAvatarProfile.openPopup();
})

//Открытие попапа добавления новой карточки
profileAddButton.addEventListener('click', () => {
  validationNewLocation.resetValidation()
  popupFormAddProfile.openPopup();
});

//Создание экземпляра класса валидации форм для формы редактирования пользователя
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

//Создание экземпляра класса валидации форм для формы добавления новой карточки
const validationNewLocation = new FormValidator(validationConfig, formAddProfile);
validationNewLocation.enableValidation();

//Создание экземпляра класса валидации форм для формы редактирования аватара пользователя
const validationEditAvatar = new FormValidator(validationConfig, formEditAvatar);
validationEditAvatar.enableValidation();

export {photoCardFullscreen, locationCardFullscreen};
export {popupCardFullscreen, handleCardClick};


