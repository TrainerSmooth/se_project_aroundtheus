import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import {
  initialCards,
  selectors,
  validationSettings,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Initialize the image modal
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

function createCard(data) {
  const card = new Card(data, "#card-template", openPreviewModal);
  return card.getView();
}

// Initialize Section for rendering cards
const cardSection = new Section({
  renderer: (item) => {
    const cardEl = createCard(item);
    cardSection.addItem(cardEl);
  },
  selector: selectors.cardSelection,
});
cardSection.renderItems(initialCards);

// Initialize User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  infoSelector: ".profile__description",
});

// Profile Edit Modal
const profileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profileModal.close();
  },
});
profileModal.setEventListeners();

// Add Card Modal
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const newCard = createCard({ name: formData.Title, link: formData.url });
    cardSection.addItem(newCard);
    addCardModal.close();
    addCardFormValidator.disableButton();
  },
});
addCardModal.setEventListeners();

// Form Validators
const profileForm = document.forms["profile-form"]; // Get form using 'name' attribute
const cardForm = document.forms["add-card-form"]; // Get form using 'name' attribute

const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, cardForm);
addCardFormValidator.enableValidation();

// Inputs for profile form
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Profile Edit Button Listener
const profileEditButton = document.querySelector("#profile-edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;

  profileFormValidator.resetValidation(); // Reset validation when opening
  profileModal.open();
});

// Add Card Button Listener
const addCardButton = document.querySelector("#profile-add-button");
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation(); // Reset validation when opening
  addCardModal.open();
});
