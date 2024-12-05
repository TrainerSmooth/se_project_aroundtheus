import modal from "./modal.js";

export default class modalWithImage extends modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._imageElement = this._popup.querySelector("#modal__image-preview");
    this._captionElement = this._popup.querySelector(".modal__title");
  }

  function(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
    evt.target.reset();
  }
  function(evt) {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCards({ name, link }, cardsWrap);
    closeModal(addCardModal);
    evt.target.reset();
    addFormValidator.disableButton();
  }

  function(cardData) {
    previewImageModal.src = cardData.link;
    previewImageModal.alt = cardData.name;
    previewCaptionModal.textContent = cardData.name;

    openModal(previewModal);
  }
}
