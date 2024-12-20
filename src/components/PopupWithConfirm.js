import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (this._handleSubmit) {
        try {
          await this._handleSubmit();
        } catch (error) {
          console.error("Error during submission:", error);
        }
      } else {
        console.error("Submit action is not defined.");
      }
    });
  }

  setIsLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
      this._submitButton.disabled = false;
    }
  }
}
