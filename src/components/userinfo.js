export default class UserInfo {
  constructor({ title, description }) {
    this.title = document.querySelector("#profile-title-input");
    this.description = document.querySelector("#profile-description-input");
  }

  getUserInfo() {
    this.userInfo = {
      title: this.title.textContent,
      description: this.description.textContent,
    };
    return this.userInfo;
  }

  setUserInfo({ title, description }) {
    this.title.textContent = title;
    this.description.textContent = description;
  }
}
