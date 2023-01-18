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
function startCards(arr) {
arr.forEach((card) => {
  // Выбираем элемент куда будем вставлять
  const placesPhotoCards = document.querySelector('.places__photo-cards');
  //Помещаем элемент из шаблона в переменную
  const templateCards = document.querySelector('#template-cards').content;
  //Клонируем элемент со всем содержимым
  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  //Вставляем значения из массива в новый элемент
  cardsElement.querySelector('.places__photo').src = card.link;
  cardsElement.querySelector('.places__card-name').textContent = card.name;
  cardsElement.querySelector('.places__photo').alt = card.name;
  //Добавляем элемент на страницу













  placesPhotoCards.append(cardsElement);
});
}
startCards(initialCards);








// Добавление карточки пользователями
  // Находим форму в DOM
  const form = document.querySelector('.popup_addprofile');
  // Находим поля формы в DOM
  const newCard = form.querySelector('.popup__container_form');
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


  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  cardsElement.querySelector('.places__photo').src = `${linkInputForm.value}`;
  cardsElement.querySelector('.places__card-name').textContent = nameInputForm.value;
  cardsElement.querySelector('.places__photo').alt = nameInputForm.value;

  // return initialCards.unshift({name: nameInputForm.value, link:`${linkInputForm.value}`});
// слушатель события Submit отправки формы новой карточки
  placesPhotoCards.prepend(cardsElement);
  const popupprofileclose = document.querySelector('.popup_addprofile');
  popupprofileclose.classList.remove('popup_opened');



  const btnlike = document.querySelectorAll('.places__button-like');
  btnlike.forEach(button => {
    button.addEventListener('click', btnactive);
  });


  const deleteButton = document.querySelectorAll('.places__card-delete');
  deleteButton.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', deletecard);
  });


  const cardPhoto = document.querySelectorAll('.places__photo');
  cardPhoto.forEach(image => {
    image.addEventListener('click', openPhoto);
  });






}
form.addEventListener('submit', formCard);

// Удаление карточек
const deleteButton = document.querySelectorAll('.places__card-delete');
const deletecard = (evt) => {
  const delCard = evt.target.closest('.places__element');
  delCard.remove('places__card-delete');
}

deleteButton.forEach(deleteBtn => {
  deleteBtn.addEventListener('click', deletecard);
});



let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

// Закрытие поппапов
const popupClose = document.querySelectorAll('.popup__button-close');
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

const btnactive = (evt) => {
  evt.target.classList.toggle('places__button-like_active');
}
btnlike.forEach(button => {
  button.addEventListener('click', btnactive);
});


// Попап открытия карточек на весь экран

// const popupCardFullscreen = document.querySelector('.popup_cardfullscreen');
// const cardPhoto = document.querySelectorAll('.places__photo');

// cardPhotoFullscreen.addEventListener('click', openPhoto);
const openPhoto = (evt) => {
  evt.target.classList.add('popup_opened');

  console.log('test');
  const templateCards = document.querySelector('#template-cards').content;
  //Клонируем элемент со всем содержимым
  const cardsElement = templateCards.querySelector('.places__element').cloneNode(true);
  console.log(cardsElement.querySelector('.places__card-name').textContent);

}

const cardPhoto = document.querySelectorAll('.places__photo');
  cardPhoto.forEach(image => {
    image.addEventListener('click', openPhoto);
  });
