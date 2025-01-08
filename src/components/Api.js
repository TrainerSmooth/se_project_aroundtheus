// Api class
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Check server response
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Handle network errors or unexpected issues
  _handleError(err) {
    console.error("API Error:", err);
    return Promise.reject(err);
  }

  // 1. Get user information
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 2. Update user profile information
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 3. Update user avatar
  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 4. Fetch all cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Legacy alias for getInitialCards
  getCards() {
    return this.getInitialCards();
  }

  // 5. Add a new card
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 6. Delete a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 7. Like a card
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 8. Remove like from a card
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // 9. Fetch user info and cards together
  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userInfo, cards]) => ({ userInfo, cards }))
      .catch(this._handleError);
  }
}

// Create an instance of the Api class
const api = new Api({
  baseUrl: "https://your-api-url.com", // Replace with your actual API URL
  headers: {
    authorization: "Bearer your-auth-token", // Replace with your actual token if applicable
    "Content-Type": "application/json",
  },
});

// Debug: Log the api instance to ensure it's defined
console.log(api);

// Export the api instance
export default api;
