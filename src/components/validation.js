// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);

//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, config) {
//   if (!inputEl.validity.valid) {
//     showInputError(formEl, inputEl, config);
//   } else {
//     hideInputError(formEl, inputEl, config);
//   }
// }

// function hasInvalidInput(inputEl) {
//   const inputArray = Array.from(inputEl);
//   return inputArray.some((inputEl) => !inputEl.validity.valid);
// }

// function toggleButtonState(inputEl, submitButton, { inactiveButtonClass }) {
//   let foundInvalid = false;

//   inputEl.forEach((inputEl) => {
//     if (!inputEl.validity.valid) {
//       foundInvalid = true;
//     }
//   });

//   if (foundInvalid) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function setEventListeners(formEl, config) {
//   const { inputSelector } = config;
//   const inputEls = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(config.submitButtonSelector);
//   toggleButtonState(inputEls, submitButton, config);
//   //
//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", (e) => {
//       checkInputValidity(formEl, inputEl, config);
//       toggleButtonState(inputEls, submitButton, config);
//     });
//   });
// }

// function enableValidation(config) {
//   const formEl = [...document.querySelectorAll(config.formSelector)];
//   formEl.forEach((formEl) => {
//     formEl.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });

//     setEventListeners(formEl, config);
//   });
// }

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(config);
