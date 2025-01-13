import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import { selectors, validationSettings } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";

// Initialize User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  infoSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// Fetch and display user info
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({ title: userData.name, description: userData.about });
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => console.error(`Error fetching user info: ${err}`));

// Initialize the image modal
const imageModal = new PopupWithImage("#image-preview-modal");
imageModal.setEventListeners();

function openPreviewModal(cardData) {
  imageModal.open(cardData);
}

// Confirm Delete Modal
const deleteCardModal = new PopupWithConfirm("#card-delete-modal");
deleteCardModal.setEventListeners();

function openDeleteCardModal(cardId, cardElement) {
  deleteCardModal.setSubmitAction(() => {
    deleteCardModal.setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove(); // Remove the card from the DOM immediately after successful deletion
        deleteCardModal.close();
      })
      .catch((err) => {
        console.error(`Error deleting card: ${err}`);
        alert("Failed to delete the card. Please try again."); // Optional user feedback
      })
      .finally(() => deleteCardModal.setIsLoading(false));
  });
  deleteCardModal.open();
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openPreviewModal,
    (cardId, isLiked) => {
      const apiCall = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
      apiCall.then((updatedCard) => {
        card.updateLikes(updatedCard.likes); // Updates likes dynamically in the UI
      });
    },
    openDeleteCardModal // Pass the delete modal function directly
  );
  return card.getView();
}

// Initialize Section for rendering cards
const cardSection = new Section({
  renderer: (item) => {
    const cardEl = createCard(item); // Create and return the card element
    return cardEl;
  },
  selector: selectors.cardSelection, // The CSS selector for the card container
});

// Fetch and render cards
api
  .getCards()
  .then((cards) => {
    cardSection.renderItems(cards.reverse());
  })
  .catch((err) => console.error(`Error fetching cards: ${err}`));

// Profile Edit Modal
const profileModal = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    api
      .updateUserInfo({ name: formData.title, about: formData.description })
      .then((updatedUserData) => {
        userInfo.setUserInfo({
          title: updatedUserData.name,
          description: updatedUserData.about,
        });
        profileModal.close();
      })
      .catch((err) => console.error(`Error updating user info: ${err}`));
  },
});
profileModal.setEventListeners();

// Add Card Modal
const addCardModal = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    api
      .addCard({ name: formData.Title, link: formData.url })
      .then((newCard) => {
        const cardEl = createCard(newCard);
        cardSection.addItem(cardEl);
        addCardModal.close();
        addCardFormValidator.disableButton();
      })
      .catch((err) => console.error(`Error adding card: ${err}`));
  },
});
addCardModal.setEventListeners();

// Avatar Modal
const avatarModal = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: (formData) => {
    api
      .updateAvatar(formData.avatarUrl)
      .then((updatedUserData) => {
        userInfo.setAvatar(updatedUserData.avatar);
        avatarModal.close();
      })
      .catch((err) => console.error(`Error updating avatar: ${err}`));
  },
});

avatarModal.setEventListeners();

// Form Validators
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["add-card-form"];
const avatarForm = document.forms["avatar-form"];

const profileFormValidator = new FormValidator(validationSettings, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSettings, cardForm);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationSettings, avatarForm);
avatarFormValidator.enableValidation();

// Button Listeners
const profileEditButton = document.querySelector("#profile-edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  const profileTitleInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
  );

  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;

  profileFormValidator.resetValidation();
  profileModal.open();
});

const addCardButton = document.querySelector("#profile-add-button");
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardModal.open();
});

const avatarEditButton = document.querySelector(".profile__image-btn");
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarModal.open();
});
