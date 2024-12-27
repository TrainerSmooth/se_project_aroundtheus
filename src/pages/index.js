import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import { selectors, validationSettings } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

// Provided token object
const tokenData = {
  user: {
    name: "Placeholder name",
    about: "Placeholder description",
    avatar:
      "https://practicum-content.s3.amazonaws.com/resources/avatar_placeholder_1704989734.svg",
    _id: "fcb4e5e6e3cc8945a1ab9def",
  },
  token: "ee59e3de-658f-4b92-9a5b-87805c188487",
};

// Initialize API with the dynamic token
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: tokenData.token, // Use the token dynamically
    "Content-Type": "application/json",
  },
});

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

// Function to create a new card
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openPreviewModal,
    (cardId, isLiked) => {
      const apiCall = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
      apiCall
        .then((updatedCard) => {
          card.updateLikes(updatedCard.likes.length);
        })
        .catch((err) => console.error(`Error updating like status: ${err}`));
    },
    (cardId) => {
      deleteCardModal.open(cardId); // Pass card ID to delete modal
    }
  );
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
  popupSelector: "#avatar-edit-modal",
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

// Confirm Delete Modal
const deleteCardModal = new PopupWithForm({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        document.getElementById(cardId).remove();
        deleteCardModal.close();
      })
      .catch((err) => console.error(`Error deleting card: ${err}`));
  },
});
deleteCardModal.setEventListeners();

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

const avatarEditButton = document.querySelector("#avatar-edit-button");
avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarModal.open();
});
