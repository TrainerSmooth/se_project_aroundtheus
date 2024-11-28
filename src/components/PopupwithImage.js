import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImage = this._popupWithImage.querySelector(
      ".modal__image-preview"
    );
    this._imageDescription = this._popupElement.querySelector(".modal__input");
  }

  open(name, link) {
    this._cardImagePopup.src = link;
    this._cardImagePopup.alt = name;
    this._imageDescription.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
