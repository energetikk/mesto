export class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
      headers: {
        authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // другие методы работы с API
}

