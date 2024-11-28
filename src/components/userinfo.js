export default class UserInfo {
  constructor({ profileSelector, jobSelector }) {
    this._profileElement = document.querySelector(profileSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      title: this._profileElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._profileElement.textContent = title;
    this._jobElement.textContent = description;
  }
}