class FormValidator {
  constructor(settings, formEl) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formEl;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._inputEls = [
      ...this._formElement.querySelectorAll(".profile__info", true),
    ];
    this._submitButton = this._formElement.querySelector(
      ".modal__button",
      true
    );
    this._inputEls.forEach((inputEl) => {
      this._checkInputValidity(inputEl);
    });
    this._setEventListeners(console.log(""));
  }

  _showInputError(inputEl) {
    const errorMsg = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMsg.textContent = inputEl.validationMessage;
    errorMsg.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMsg = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMsg.textContent = "";
    errorMsg.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButton() {
    let invalidInput = false;
    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        invalidInput = true;
      }
    });

    if (invalidInput) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners() {
    this._inputEls = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this.disableButton();

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButton();
      });
    });
  }
}

export default FormValidator;
