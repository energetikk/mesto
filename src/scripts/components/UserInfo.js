export default class UserInfo {
  constructor({profileName, profileJob, avatarImage}) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._avatar = document.querySelector(avatarImage);
  }

  getUserInfo() {
    return {name: this._profileName.textContent, job: this._profileJob.textContent}
  }

  setUserInfo({name, about, avatar}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this.setAvatarImage(avatar);
  }

  setAvatarImage(avatar) {
    this._avatar.src = avatar;
  }

}
