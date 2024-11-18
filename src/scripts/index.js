import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lao di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ---------------------------------------------------------------------------------- */
/*                                    Elements                                       */
/* ---------------------------------------------------------------------------------- */
// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#image-preview-modal");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const modalSubmitButton = addCardFormEl.querySelector(".modal__button");
// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardlistEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addtrashButton = document.querySelector(".card__trash-button");
const cardTitleInput = addCardFormEl.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormEl.querySelector(".modal__input_type_url");
const imagePreviewModal = document.querySelector("#image-preview-modal");
const previewImageModal = document.querySelector(".modal__image-preview");
const previewCaptionModal = document.querySelector(".modal__caption");
const closeButtons = document.querySelectorAll(".modal__close");
const profileEditForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*Functions*/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalByEscape);
  modal.removeEventListener("click", closeModalOnMouseDown);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalByEscape);
  modal.addEventListener("click", closeModalOnMouseDown);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImagePreview);
  return card.getView();
}

function renderCards(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
function closeModalOnMouseDown(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

/*Event Handlers*/
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  evt.target.reset();
}
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCards({ name, link }, cardsWrap);
  closeModal(addCardModal);
  evt.target.reset();
  addFormValidator.disableButton();
}

function handleImagePreview(cardData) {
  previewImageModal.src = cardData.link;
  previewImageModal.alt = cardData.name;
  previewCaptionModal.textContent = cardData.name;

  openModal(previewModal);
}

/*Event Listeners*/
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileEditButton.addEventListener("click", () => {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  openModal(editProfileModal);
});
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
// profileModalCloseButton.addEventListener("click", () => closeModal(modal));
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addCardFormEl.addEventListener("submit", handleAddCardFormSubmit);
// for loop that inserts a card
initialCards.forEach((cardData) => renderCards(cardData, cardsWrap));
// add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

modalSubmitButton.disabled = true;

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardFormEl);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
