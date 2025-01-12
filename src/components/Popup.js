export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      throw new Error(`Popup with selector "${popupSelector}" not found.`);
    }
    this._closeButton = this._popup.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  _handleCloseButtonClick() {
    this.close();
  }

  setEventListeners() {
    if (this._closeButton) {
      this._closeButton.addEventListener("click", this._handleCloseButtonClick);
    } else {
      console.warn("Close button not found in the popup:", this._popup);
    }
    this._popup.addEventListener("mousedown", this._handleOverlayClick);
  }
}
