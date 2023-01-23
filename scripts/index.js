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



const placesPhotoCards = document.querySelector('.places__photo-cards');

const templateCards = document.querySelector('#template-cards').content;

const popupCardFullscreen = document.querySelector('.popup_cardfullscreen');


const createCard = (card) => {
  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  cardsElement.querySelector('.places__photo').src = card.link;
  cardsElement.querySelector('.places__card-name').textContent = card.name;
  cardsElement.querySelector('.places__photo').alt = card.name;
  console.log(cardsElement);

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
  popupCardFullscreen.classList.add('popup_opened');
  popupCardFullscreen.querySelector('.popup__card-photo').src = currentImage.src;
  popupCardFullscreen.querySelector('.popup__card-location').textContent = currentImage.alt;
  });

  return cardsElement;
};

const renderCard = (card) => {
  placesPhotoCards.prepend(createCard(card));
}

initialCards.forEach((item) => {
  renderCard(item);
});


// Добавление карточки пользователями
  // Находим форму в DOM
const form = document.querySelector('.popup_addprofile');
// Находим поля формы в DOM
const newCard = form.querySelector('.popup__container_form');
//Находим поля формы в DOM
function formCard (evt) {
  evt.preventDefault();
  const nameInputForm = newCard.querySelector('.form__item_place_name');
  const linkInputForm = newCard.querySelector('.form__item_place_link');
  // Выбираем элемент куда будем вставлять
  const placesPhotoCards = document.querySelector('.places__photo-cards');
  //Помещаем элемент из шаблона в переменную
  const templateCards = document.querySelector('#template-cards').content;
  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  cardsElement.querySelector('.places__photo').src = `${linkInputForm.value}`;
  cardsElement.querySelector('.places__card-name').textContent = nameInputForm.value;
  cardsElement.querySelector('.places__photo').alt = nameInputForm.value;
  // слушатель события Submit отправки формы новой карточки
  placesPhotoCards.prepend(cardsElement);
  const popupprofileclose = document.querySelector('.popup_addprofile');
  popupprofileclose.classList.remove('popup_opened');
  const btnLikes = document.querySelectorAll('.places__button-like');
  btnLikes.forEach(button => {
    button.addEventListener('click', btnactive);
  });
  const deleteButtons = document.querySelectorAll('.places__card-delete');
  deleteButtons.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', deletecard);
  });
  const cardsdPhoto = document.querySelectorAll('.places__photo');
  cardsPhoto.forEach(image => {
    image.addEventListener('click', openPhoto);
  });
}
form.addEventListener('submit', formCard);

//Удаление карточек
const deleteButtons = document.querySelectorAll('.places__card-delete');
const deletecard = (evt) => {
  const delCard = evt.target.closest('.places__element');
  delCard.remove('places__card-delete');
};

deleteButtons.forEach(deleteBtn => {
  deleteBtn.addEventListener('click', deletecard);
});
///////////////////////////////////////////////////////////
const editProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

// Закрытие попапов
const popupClose = document.querySelectorAll('.popup__button-close');
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

popupClose.forEach(buttonclose => {
  buttonclose.addEventListener('click', function (evt) {
    const btnClose = evt.target.closest('.popup');
    closePopup(btnClose);
})
});

const profileAddButton = document.querySelector('.profile__addbutton');
const popupAddProfile = document.querySelector('.popup_addprofile');
const popupAddPfofileClose = profileAddButton.querySelector('.popup__button-close');

//Попап добавления профиля
function addProfile() {
  popupAddProfile.classList.add('popup_opened');
}
profileAddButton.addEventListener('click', addProfile);

function editButton() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editProfile.addEventListener('click', editButton);
// Находим форму в DOM
const formElement = popup.querySelector('.popup__container');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.form__item_el_name');
const jobInput = formElement.querySelector('.form__item_el_job');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// console.log(profileJob);
// console.log(profileName);

function handleFormSubmit (evt) {
  evt.preventDefault();
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');
  console.log(profileJob);
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// // выберем кнопку лайка
// const btnLikes = document.querySelectorAll('.places__button-like');

// const btnactive = (evt) => {
//   evt.target.classList.toggle('places__button-like_active');
// }
// btnLikes.forEach(button => {
//   button.addEventListener('click', btnactive);
// });

// // Попап открытия карточек на весь экран
// // const popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
// function openPhoto(evt) {
//   const currentImage = evt.target;
//   popupCardFullscreen.classList.add('popup_opened');
//   popupCardFullscreen.querySelector('.popup__card-photo').src = currentImage.src;
//   popupCardFullscreen.querySelector('.popup__card-location').textContent = currentImage.alt;
// };

// // const cardsPhoto = document.querySelectorAll('.places__photo');
// //   cardsPhoto.forEach((image) => {
// //     image.addEventListener('click', openPhoto);
