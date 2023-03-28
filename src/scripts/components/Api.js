// import { get } from "core-js/core/dict";

import { data } from "autoprefixer";

export class Api {
  constructor(config) {
    this._url = config.url,
    this._headers = config.headers;
  }

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
}







