export default class userInfo {
  constructor({ nameSelector, infoSelector }) {
    this.profileTitle = document.querySelector(nameSelector);
    this.profileDescription = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      title: this.profileTitle.textContent,
      description: this.profileDescription.textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (title) this.profileTitle.textContent = title;
    if (description) this.profileDescription.textContent = description;
  }
}
