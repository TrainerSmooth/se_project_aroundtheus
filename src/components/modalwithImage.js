import modal from "./modal.js";

class modalWithImage extends modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._modalElement = document.querySelector(modalSelector);
    this._modalImage = this._modalElement.querySelector(
      ".modal__image-preview"
    );
    this._imageDescription = this._modalElement.querySelector(".modal__input");
  }
}

const modalWithImageInstance = new modalWithImage({
  modalSelector: ".modal",
});

export default modalWithImage;
