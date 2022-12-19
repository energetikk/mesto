let editProfile = document.querySelector('.profile__edit-button')
console.log(editProfile);




let popup = document.querySelector('.popup');


let popupClose = popup.querySelector('.popup__button-close');

function editButton() {
  popup.classList.add('popup_opened');
}

function showClick() {
  popup.classList.remove('popup_opened');
}

editProfile.addEventListener('click', editButton);
popupClose.addEventListener('click', showClick);





