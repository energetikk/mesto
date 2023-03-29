// import { get } from "core-js/core/dict";

import { data } from "autoprefixer";

export class Api {
  constructor(config) {
    this._url = config.url,
    this._headers = config.headers;
  }
//Получить начальные карточки с сервера
  getInitialCards() {
    return fetch(this._url, {
      headers: {authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077'
      }})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
//Добавить карточку на сервер
  addCard(data) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка")
      });
    }

//Запросить информацию о пользователе с сервера
  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
    method: 'GET',
    headers: {authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077'}
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  }
//Записать обновленную информацию о пользователе на сервер
  setUserInfo(data) {
    console.log(data)
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me/', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameuser,
        about: data.jobuser
      })})
    .then(res => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка")
  });


}
//Записать обновленный аватар пользователя на сервер
  setAvatar(data) {
    console.log(data)
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })})
    .then(res => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка")
  });
}

//Запрос на удаление карточки с сервера
deleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${cardId}`, {
  method: 'DELETE',
  headers: this._headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject("Произошла ошибка")
  })
}
}





