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
}
  // другие методы работы с API


