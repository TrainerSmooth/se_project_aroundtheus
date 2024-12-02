export const initialCards = [
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
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

//Profile Elements//
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileInputName = document.querySelector("#profile-input-title");
export const profileInputDescription = document.querySelector(
  "#profile-description-input"
);

//Card Elements//
export const cardsWrap = document.querySelector(".cards__image");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardDelete = document.querySelectorAll("card__trash-button");

//New Card Elements//
export const addNewCardModal = document.querySelector("#add-card-modal");
export const newCardInputTitle = addNewCardModal.querySelector(
  "#profile-title-input"
);
export const newCardInputUrl = addNewCardModal.querySelector("#input-type-url");

//View Image Elements
export const openImageModalDescription = document.querySelector(
  ".modal__description"
);
export const openImageModal = document.querySelector(".modal__image");

//Buttons//
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileModalClose = profileEditModal.querySelector(
  "#profile-modal-close"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const newCardModalClose =
  addNewCardModal.querySelector("#card-modal-close");
export const openImageClose = document.querySelector("#modal__close");
