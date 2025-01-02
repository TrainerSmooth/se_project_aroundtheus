// Reference to modals
export const cardAddForm = document.querySelector("#add-card-modal");
export const profileEditForm = document.querySelector("#profile-edit-modal");
export const confirmDeleteForm = document.querySelector(
  "#delete-confirm-modal"
); // Added reference for Delete Confirmation popup
export const avatarEditForm = document.querySelector("#avatar-edit-modal"); // Added reference for Avatar Edit popup

// Reference to the card list container
export const cardListEl = document.querySelector(".cards__list");

// DOM selectors
export const selectors = {
  cardTemplate: "#card-template", // Selector for card template
  cardSelection: ".cards__list", // Selector for card container
};

// Form validation settings
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
