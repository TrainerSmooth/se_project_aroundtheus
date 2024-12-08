import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal__image-preview");
    this._captionElement = this._popup.querySelector(".modal__caption");
  }

  open(card) {
    super.open();
    this._imageElement.src = card.link;
    this._imageElement.alt = card.name;
    this._captionElement.textContent = card.name;
  }
}
