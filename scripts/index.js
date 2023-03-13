import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Массив данных для загрузки первых 6-ти карточек на страницу
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


class Section {
  constructor({data, renderer}, containerSelector) {
    this.items = data;
    this.renderer = renderer;
    this.containerSelector = document.querySelector(containerSelector);
  }

addItem(element) {
  this.containerSelector.prepend(element);
}

renderItems() {
  this.items.forEach((item) => {
    this.renderer(item);
  });
};
}




const section = new Section({data: initialCards, renderer:
   (item) => {
    const card = new Card(item, '#template-cards', handleCardClick);
    const cardElement = card.generateCard();
    // return cardElement
    section.addItem(cardElement);}
    }, '.places__photo-cards');


//Отрисовка карточек
section.renderItems();





//////////////////////////////////////////////////////////////////
class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.buttonCloseAll = document.querySelectorAll('.popup__button-close');
  }
// //Универсальная функция открытие попапов
  openPopup() {
    this.popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }
    );
};

// // Универсальная функция закрытия попапов
  closePopup() {
    this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }
    );
};

_handleEscClose(evt) {
  if (evt.key === 'Escape') {
    this.closePopup();
}
}

setEventListeners() {
  this.buttonCloseAll.forEach((buttonclose) => {
      buttonclose.addEventListener('click', () => {
        this.closePopup();
      });
  })

  this.popupElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
           this.closePopup();
        };
      });
}
}
///////////////////////////////////////////////////////////////////
const editProfile = new Popup ('.popup_editprofile');
buttonEditProfile.addEventListener('click', () => {
  editProfile.openPopup();
  // nameInput.value = profileName.textContent;
  // jobInput.value = profileJob.textContent;
  // const {a, b} = userInfo.getUserInfo();
  // nameInput.value = a;
});
editProfile.setEventListeners();


const addProfile = new Popup ('.popup_addprofile');
profileAddButton.addEventListener('click', () => {
  addProfile.openPopup();
});
addProfile.setEventListeners();


class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    }
    openPopup(name, link) {
      super.openPopup();
      this._popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
      this._popupCardFullscreenName = this._popupCardFullscreen.querySelector('.popup__card-location');
      this._popupCardFullscreenLink = this._popupCardFullscreen.querySelector('.popup__card-photo');
      this._popupCardFullscreenName.textContent = name;
      this._popupCardFullscreenLink.src = link;
      this._popupCardFullscreenLink.alt = name;
    };
  }

function handleCardClick(name, link) {
  const popupFull = new PopupWithImage('.popup_cardfullscreen')

  popupFull.openPopup(name, link)
  popupFull.setEventListeners()
  }

class UserInfo {
  constructor({profileName, profileJob}) {
    this.profileName = document.querySelector(profileName);
    this.profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    // let obj = {};
    // nameInput.value = this.profileName.textContent;
    // jobInput.value = this.profileJob.textContent;
    // obj.name = this.selectorUserName;
    // // obj.job =
    return {name: this.profileName.textContent, job: this.profileJob.textContent}

  }



  setUserInfo() {
    this.profileName.textContent = nameInput.value;
    this.profileJob.textContent = jobInput.value;
    // console.log(jobInput);

    // profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
  }
}


const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__job'});
console.log(userInfo.getUserInfo())

const {name, job} = userInfo.getUserInfo();
console.log(name)
nameInput.value = name;
jobInput.value = job;




class PopupWithForm extends Popup {
  constructor({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this.popupElement.querySelector('.form');
    console.log(this.popupElement);
    console.log(this._form);
  }

  _getInputValues() {

  this._inputList = this._form.querySelectorAll('.form__item');
  // console.log(this._inputList);

  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  // возвращаем объект значений
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());

    });

  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

}

///////
// function handleProfileFormSubmit(data) {
//   userInfo.setUserInfo(data["profile__user-name"], data["profile__job"]);
//   popupProfile.close();
// }
////////




const popupFormEditProfile = new PopupWithForm ({popupSelector: '.form_addprofile', handleSubmitForm: (data) => {
  userInfo.setUserInfo(data["form__item_el_name"], data["form__item_el_job"]);
}})
popupFormEditProfile.setEventListeners()


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
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'popup__error_visible'
};

//Создание инстансов класса валидации форм
const validationProfile = new FormValidator(validationConfig, formEditProfile);
validationProfile.enableValidation();

const validationNewLocation = new FormValidator(validationConfig, formAddProfile);
validationNewLocation.enableValidation();

export {validationConfig, photoCardFullscreen, locationCardFullscreen};
export {popupCardFullscreen, handleCardClick};
