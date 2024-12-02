import modal from "./modal.js";

export class modalWithForm extends modal {
  constructor({ modalSelector }, handleFormSubmit) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._modalElement.querySelector(".modal__container");
    this._inputList = this._formElement.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputValue = {};

    this._inputList.forEach((input) => {
      inputValue[input.name] = input.value;
    });
    return inputValue;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default modalWithForm;
