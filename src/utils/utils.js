import { handleEscUpEsc } from "core-js/core/object";

export const imagemodalWindow = document.querySelector(".popup__image");
export const imageCaption = imagemodalWindow.querySelector(".popup__caption");

export const closeModal = (modalWindow) => {
  modalWindow.classList.remove("image-preview-modal");
  document.removeEventListener("keyup", handleEscUp);
};

export const openModal = (modalWindow) => {
  modalWindow.classList.add("image-preview-modal");
  document.addEventListener("keyup", handleEscUpEsc);
};

export const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

export const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    action(activePopup);
  }
};
