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

  getUserInfo() {
    console.log("Fetching user info...");
    console.log("Headers:", this._headers);
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  setUserInfo({ title, description }) {
    if (title) this.profileTitle.textContent = title;
    if (description) this.profileDescription.textContent = description;
  }

  setAvatar(avatar) {
    this.profileAvatar.src = avatar;
  }
}
