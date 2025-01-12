import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
    this._handleSubmit = null; // Ensures the submit action is explicitly set
  }

  setSubmitAction(handleSubmit) {
    if (typeof handleSubmit === "function") {
      this._handleSubmit = handleSubmit;
    } else {
      console.error("Provided submit action is not a function.");
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (this._handleSubmit) {
        this.setIsLoading(true); // Set loading state
        try {
          await this._handleSubmit(); // Await the submit action
          this.close(); // Close the popup after a successful operation
        } catch (error) {
          console.error("Error during submission:", error);
        } finally {
          this.setIsLoading(false); // Reset loading state
        }
      } else {
        console.warn("Submit action is not defined.");
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
