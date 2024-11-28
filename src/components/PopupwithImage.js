import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupElement = document.querySelector(popupSelector);
    this._popupImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._imageDescription = this._popupElement.querySelector(".modal__input");
  }
}

const popupWithImage = new PopupWithImage({
  popupSelector: ".modal",
});

export default PopupWithImage;
