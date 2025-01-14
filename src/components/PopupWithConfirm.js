import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button-confirm");
    this._defaultButtonText = this._submitButton.textContent; // Save the default button text
  }

  // Method to set the function that will handle the submission
  setSubmitAction(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  // Add event listeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (this._handleSubmit) {
        this.setIsLoading(true); // Set loading state when submission starts
        try {
          await this._handleSubmit(); // Execute the submit action
          this.close(); // Close popup on success
        } catch (error) {
          console.error("Error during submission:", error);
        } finally {
          this.setIsLoading(false); // Revert button state regardless of success or failure
        }
      } else {
        console.error("Submit action is not defined.");
      }
    });
  }

  // Method to display the loading state on the button
  setIsLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving..."; // Set loading text (change to "Deleting..." if needed)
      this._submitButton.disabled = true; // Disable button during loading
    } else {
      this._submitButton.textContent = this._defaultButtonText; // Reset to default text
      this._submitButton.disabled = false; // Re-enable button
    }
  }
}
