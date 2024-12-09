import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";

import {
  initialCards,
  selectors,
  validationSettings,
  cardAddForm,
  profileEditForm,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/userinfo.js";

// Initialize the image modal first
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

function createCard(data) {
  const card = new Card(data, "#card-template", openPreviewModal);
  return card.getView();
}

const cardSection = new Section({
  renderer: (item) => {
    const cardEl = createCard(item);
    cardSection.addItem(cardEl);
  },
  selector: selectors.cardSelection,
});
cardSection.renderItems(initialCards);

// Other modal and form initializations
// Add Card Modal
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const newCard = createCard({ name: formData.Title, link: formData.url });
    cardSection.addItem(newCard);
    addCardModal.close();
  },
});
addCardModal.setEventListeners();

// Profile Modal
const profileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    profileModal.close();
  },
});
profileModal.setEventListeners();

// User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  infoSelector: ".profile__description",
});

// Profile Edit Button
const profileEditButton = document.querySelector("#profile-edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  profileModal.open();
});

// Inputs
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardButton = document.querySelector("#profile-add-button");
addCardButton.addEventListener("click", () => {
  addCardModal.open();
});

const addCardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#add-card-form")
);
addCardFormValidator.enableValidation();
