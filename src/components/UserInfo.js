export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this.profileTitle = document.querySelector(nameSelector);
    this.profileDescription = document.querySelector(infoSelector);
    this.profileAvatar = document.querySelector(avatarSelector);
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

  setAvatar(avatar) {
    this.profileAvatar.src = avatar;
  }
}
