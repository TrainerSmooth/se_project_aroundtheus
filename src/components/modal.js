export default class Popup {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscape.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscape(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._modalElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
