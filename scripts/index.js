//Добавление первых 6 карточек на странице

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

initialCards.forEach((card) => {
  const name = card.name;
  const link = card.link;
  // Выбираем элемент куда будем вставлять
  const placesPhotoCards = document.querySelector('.places__photo-cards');
  //Помещаем элемент из шаблона в переменную
  const templateCards = document.querySelector('#template-cards').content;
  // console.log(templateCards);

  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  // console.log(cardsElement);
  cardsElement.querySelector('.places__photo').src = card.link;
  cardsElement.querySelector('.places__card-name').textContent = card.name;
  cardsElement.querySelector('.places__photo').alt = card.name;
  placesPhotoCards.append(cardsElement);
});


// Добавление карточки пользователями

// Находим форму в DOM
const form = document.querySelector('.popup_addprofile');
const newCard = form.querySelector('.popup__container_form');
console.log(form);

//
// Находим поля формы в DOM

function formCard (evt) {
  evt.preventDefault();
  const nameInputForm = newCard.querySelector('.form__item_place_name');
  const linkInputForm = newCard.querySelector('.form__item_place_link');
  console.log(nameInputForm.value);
  console.log(linkInputForm.value);



  // Выбираем элемент куда будем вставлять
  const placesPhotoCards = document.querySelector('.places__photo-cards');
  //Помещаем элемент из шаблона в переменную
  const templateCards = document.querySelector('#template-cards').content;
  // console.log(templateCards);

  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  cardsElement.querySelector('.places__photo').src = `${linkInputForm.value}`;
  cardsElement.querySelector('.places__card-name').textContent = nameInputForm.value;
  cardsElement.querySelector('.places__photo').alt = nameInputForm.value;
  placesPhotoCards.prepend(cardsElement);


 // Кнопка лайка на добавленные карточки
  const btnlike = document.querySelectorAll('.places__button-like');
  console.log(btnlike);
  const btnactive = (evt) => {
    evt.target.classList.toggle('places__button-like_active');
  }
  btnlike.forEach(button => {
    button.addEventListener('click', btnactive);
  });


}
// слушатель события Submit отправки формы новой карточки
form.addEventListener('submit', formCard);






let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

// Закрытие поппапов
let popupClose = document.querySelectorAll('.popup__button-close');

function closepopup(popup) {
  popup.classList.remove('popup_opened');
};

popupClose.forEach(buttonclose => {
  buttonclose.addEventListener('click', function (evt) {
    const btnClose = evt.target.closest('.popup');
    closepopup(btnClose);
})
});

















let profileAddButton = document.querySelector('.profile__addbutton');
let popupaddprofile = document.querySelector('.popup_addprofile');
let popupAddPfofileClose = profileAddButton.querySelector('.popup__button-close');

//Попап добавления профиля
function addProfile() {
  popupaddprofile.classList.add('popup_opened');
}
profileAddButton.addEventListener('click', addProfile);

// Закрытие попапа добавления профиля

// function closepopup() {
//   popup.classList.remove('popup_opened');
// }



function editButton() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
// popupClose.addEventListener('click', closepopup);


// выберем кнопку лайка
const btnlike = document.querySelectorAll('.places__button-like');
console.log(btnlike);
const btnactive = (evt) => {
  evt.target.classList.toggle('places__button-like_active');
}
btnlike.forEach(button => {
  button.addEventListener('click', btnactive);
});
