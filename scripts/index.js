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

//Универсальная функция создания карточек
const createCard = (card) => {
  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  cardsElement.querySelector('.places__photo').src = card.link;
  cardsElement.querySelector('.places__card-name').textContent = card.name;
  cardsElement.querySelector('.places__photo').alt = card.name;

  const btnLike = cardsElement.querySelector('.places__button-like');
  btnLike.addEventListener('click', (evt) => {
    btnLike.classList.toggle('places__button-like_active')
  });

  const deleteButton = cardsElement.querySelector('.places__card-delete');
  deleteButton.addEventListener('click', (evt) => {
    const delCard = evt.target.closest('.places__element');
    delCard.remove('places__card-delete');
  });

  const cardsdPhoto = cardsElement.querySelector('.places__photo');
  cardsdPhoto.addEventListener('click', (evt) => {
  const currentImage = evt.target;
  openPopup(popupCardFullscreen);
  photoCardFullscreen.src = currentImage.src;
  photoCardFullscreen.alt = currentImage.alt;
  locationCardFullscreen.textContent = currentImage.alt;
  });
  return cardsElement;
};

//Функция отрисовки карточек на странице
const renderCard = (card) => {
  placesPhotoCards.prepend(createCard(card));
}

initialCards.forEach((item) => {
  renderCard(item);
});

// Добавление карточки пользователями
function addCard (evt) {
  evt.preventDefault();
  const createNewCard = {name: nameInputForm.value, link: linkInputForm.value};
  renderCard(createNewCard);
  evt.target.reset();
  closePopup(popupAddProfile);
};
popupAddProfile.addEventListener('submit', addCard);

// Универсальная функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Универсальная функция открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
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
