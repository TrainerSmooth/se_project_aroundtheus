export default class Card {
  constructor(
    cardData,
    cardTemplate,
    handleImagePreviewClick,
    handleLikeClick,
    openDeleteModal
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._cardTemplate = cardTemplate;
    this._handleImagePreviewClick = handleImagePreviewClick;
    this._handleLikeClick = handleLikeClick;
    this._openDeleteModal = openDeleteModal; // Pass the delete modal function
    this._currentUserId = "currentUserId"; // Replace with your actual current user ID
  }

  _setEventListeners() {
    // Preview image click
    this._cardImage.addEventListener("click", () => {
      this._handleImagePreviewClick({ link: this._link, name: this._name });
    });

    // Delete button click
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._openDeleteModal(this._cardId, this._cardElement); // Open delete modal
      });
    }

    // Like button click
    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButton.classList.contains(
        "card__like-button_active"
      );
      this._handleLikeClick(this._cardId, isLiked);
    });
  }

  // Update the likes display on the card
  updateLikes(likes) {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this.getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    // Populate card data
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
