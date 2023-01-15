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







let editProfile = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

// Закрытие поппапов
let popupClose = popup.querySelectorAll('.popup__button-close');
console.log(popupClose);

function closepopup(popupitem) {
  popupitem.classList.remove('popup_opened');
};

popupClose.forEach(buttonclose => {
  buttonclose.addEventListener('click', function (evt) {
    const btnClose = evt.currentTarget;
    closepopup(btnClose.closest('.popup'));
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

function closepopup() {
  popup.classList.remove('popup_opened');
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

//// выберем кнопку лайка

const btnlike = document.querySelectorAll('.places__button-like');


const btnactive = (evt) => {
  evt.target.classList.toggle('places__button-like_active');
}

btnlike.forEach(button => {
  button.addEventListener('click', btnactive);
});
