export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this.profileTitle = document.querySelector(nameSelector);
    this.profileDescription = document.querySelector(infoSelector);
    this.profileAvatar = document.querySelector(avatarSelector);
  }

  // Fetch current user info
  getUserInfo() {
    return {
      title: this.profileTitle.textContent,
      description: this.profileDescription.textContent,
    };
  }

  // Fetch user info from the server
  fetchUserInfo() {
    if (!this._baseUrl || !this._headers) {
      console.error("Base URL or headers are not set.");
      return Promise.reject(new Error("Base URL or headers are missing"));
    }

    console.log("Fetching user info...");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Set new user info
  setUserInfo({ title, description }) {
    if (title) this.profileTitle.textContent = title;
    if (description) this.profileDescription.textContent = description;
  }

  // Set avatar image
  setAvatar(avatar) {
    this.profileAvatar.src = avatar;
  }

  // Helper methods
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  _handleError(error) {
    console.error("Error fetching user info:", error);
  }
}
