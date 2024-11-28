import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/userinfo.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupwithImage.js";

//form validation//
const validator = new FormValidator(settings, formElement);
var settings = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formElement: formElement,
};

var formElement = document.querySelector(".modal__form");

//UserInfo JS//
const userInfo = new UserInfo({
  profileSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//PopupWithImage JS//
const popupImage = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});
popupImage.setEventListeners();

//PopupWithForms JS//
const newCardPopup = new PopupWithForm(
  { popupSelector: "#add-card-modal" },
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleEditSubmit
);
profileEditPopup.setEventListeners();

const card = new Card(constants.initialCards);

//Section JS//
const sectionCards = new Section(
  {
    items: constants.initialCards,
    renderer: (cardData) => {
      renderCard(cardData);
    },
  },
  ".cards__images"
);

//Functions//
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  return card.generateCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  sectionCards.addItem(cardElement);
}

function handleAddCardFormSubmit(inputData) {
  const { card__title, card__url } = inputData;
  renderCard({ name: card__title, link: card__url });
  addCardFormValidator.disableSubmitButton();
  newCardPopup.close();
  addNewCardForm.reset();
}

function handleEditSubmit(inputData) {
  userInfo.setUserInfo({
    title: inputData.profile__name,
    description: inputData.profile__description,
  });
  profileEditPopup.close();
}

function handleCardImageClick(name, link) {
  popupImage.open(name, link);
}

const cardDelete = document.querySelectorAll("#delete-image-close");
//const cardDeleteModal = document.querySelectorAll("#delete-image-modal");

function handleDeleteCard(card) {
  modalWithConfirm.setSubmitFunction(() => {
    api
      .deleteCard(card)
      .then(() => {
        card.remove();
      })
      .catch((err) => console.error(err));
  });
  modalWithConfirm.open();
}

//Event Listeners//
constants.profileEditButton.addEventListener("click", () => {
  const { title, description } = userInfo.getUserInfo();
  constants.profileInputName.value = title;
  constants.profileInputDescription.value = description;
  profileEditPopup.open();
});

constants.addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

constants.cardDelete.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleDeleteCard(event.target.closest(card));
    console.log("Button clicked");
  });
});

//EnableValidation
const editProfileFormValidator = new FormValidator(constants.settings);
const addCardFormValidator = new FormValidator(constants.settings);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
