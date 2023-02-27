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
const popupSubmitButton = popupAddProfile.querySelector('.form__submit');
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

/////////////////////////////////////////

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

  }

  _getTemplate() {
    const cardsElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.places__element')
    .cloneNode(true);

    return cardsElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.places__photo').src = this._link;
    this._element.querySelector('.places__card-name').textContent = this._name;
    this._element.querySelector('.places__photo').alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  _handleLikeClick() {
    this._element.querySelector('.places__button-like').classList.toggle('places__button-like_active');
}

  _setEventListeners() {
    this._element.querySelector('.places__button-like').addEventListener('click', () => {
        this._handleLikeClick();
    });
    this._element.querySelector('.places__card-delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
    });

    this._element.querySelector('.places__photo').addEventListener('click', () => {
    this._openFullScreenImage();
    });

  }

  _handleDeleteCardClick() {
    const delCard = this._element.closest('.places__element')
    delCard.remove('places__card-delete');

}
  _openFullScreenImage() {
  photoCardFullscreen.src = this._link;
  photoCardFullscreen.alt = this._name;
  locationCardFullscreen.textContent = this._name;
  openPopup(popupCardFullscreen);
  }
}


initialCards.forEach((item) => {
  const card = new Card(item, '#template-cards');
  const cardElement = card.generateCard();
  placesPhotoCards.prepend(cardElement);
});




// function createNewCard() {

//   const userCardElement = userCard.generateCard();
//   placesPhotoCards.prepend(userCardElement);

//   closePopup(popupAddProfile);
// }

popupAddProfile.addEventListener('submit', () => {
  const newCard = {name: nameInputForm.value, link: linkInputForm.value};
  const userCard = new Card(newCard, '#template-cards');
  const userCardElement = userCard.generateCard();
  placesPhotoCards.prepend(userCardElement);
  closePopup(popupAddProfile);
  // document.querySelector('.form_addprofile').reset();
});

// class UserCard extends Card {
//   constructor(newCard, templateSelector) {
//     super(data, templateSelector)
//     this._name = newCard.name
//     this._link = newCard.link


//     // this._templateSelector = templateSelector
//   }
//   // _setEventListener() {
//   //   popupAddProfile.addEventListener('submit', () => {
//   //   }
// }
// const newCard = {name: nameInputForm.value, link: linkInputForm.value};
// const userCard = new Card(newCard, '#template-cards');
// const userCardElement = userCard.generateCard();



////////////////////////////////////////

// //Универсальная функция создания карточек
// const createCard = (card) => {
//   const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
//   cardsElement.querySelector('.places__photo').src = card.link;
//   cardsElement.querySelector('.places__card-name').textContent = card.name;
//   cardsElement.querySelector('.places__photo').alt = card.name;

//   const btnLike = cardsElement.querySelector('.places__button-like');
//   btnLike.addEventListener('click', (evt) => {
//     btnLike.classList.toggle('places__button-like_active')
//   });

//   const deleteButton = cardsElement.querySelector('.places__card-delete');
//   deleteButton.addEventListener('click', (evt) => {
//     const delCard = evt.target.closest('.places__element');
//     delCard.remove('places__card-delete');
//   });

//   const cardsdPhoto = cardsElement.querySelector('.places__photo');
//   cardsdPhoto.addEventListener('click', (evt) => {
//   const currentImage = evt.target;
//   openPopup(popupCardFullscreen);
//   photoCardFullscreen.src = currentImage.src;
//   photoCardFullscreen.alt = currentImage.alt;
//   locationCardFullscreen.textContent = currentImage.alt;
//   });
//   return cardsElement;
// };

// //Функция отрисовки карточек на странице
// const renderCard = (card) => {
//   placesPhotoCards.prepend(createCard(card));
// }

// initialCards.forEach((item) => {
//   renderCard(item);
// });

// // Добавление карточки пользователями
// function addCard (evt) {
//   evt.preventDefault();
//   const createNewCard = {name: nameInputForm.value, link: linkInputForm.value};
//   renderCard(createNewCard);
//   evt.target.reset();
//   closePopup(popupAddProfile);
// };
// popupAddProfile.addEventListener('submit', addCard);

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
popupCloseBtns.forEach(buttonclose => {
  buttonclose.addEventListener('click', function (evt) {
    const btnClose = evt.target.closest('.popup');
    closePopup(btnClose);
});
});

//Попап добавления профиля
function addProfile() {
  openPopup(popupAddProfile);
  popupSubmitButton.disabled = true;
  popupSubmitButton.classList.add('form__submit_disabled');
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
console.log(initialCards);

//Закрытие попапов по оверлею
document.body.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
     closePopup(evt.target);
  };
});

// Закрытие попапов по кнопке эскейп
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
