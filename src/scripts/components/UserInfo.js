export default class UserInfo {
  constructor({profileName, profileJob}) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {name: this._profileName.textContent, job: this._profileJob.textContent}
  }

  setUserInfo({nameuser, jobuser}) {
    this._profileName.textContent = nameuser;
    this._profileJob.textContent = jobuser;
  }
}
