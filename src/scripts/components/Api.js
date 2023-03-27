// import { get } from "core-js/core/dict";

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


  userInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
    method: get,
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
}





