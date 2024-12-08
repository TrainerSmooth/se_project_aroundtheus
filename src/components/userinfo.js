export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this.profileTitleSelector = document.querySelector(nameSelector);
    this.profileDescriptionSelector = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      title: this.profileTitleSelector.textContent,
      description: this.profileDescriptionSelector.textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (title) this.profileTitleSelector.textContent = title;
    if (description) this.profileDescriptionSelector.textContent = description;
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const profileEditButton = document.querySelector("#profile-edit-button");
//   const profileTitle = document.querySelector(".profile__title");
//   const profileDescription = document.querySelector(".profile__description");
//   const profileModal = document.querySelector("#profile-edit-modal");
//   const profileTitleInput = document.querySelector("#profile-title-input");
//   const profileDescriptionInput = document.querySelector(
//     "#profile-description-input"
//   );

//   // Open modal and populate inputs
//   profileEditButton.addEventListener("click", () => {
//     profileTitleInput.value = profileTitle.textContent.trim(); // Set name
//     profileDescriptionInput.value = profileDescription.textContent.trim(); // Set description
//     profileModal.classList.add("modal_open");
//   });
// // });

// // document.addEventListener("DOMContentLoaded", () => {
//   const profileForm = document.querySelector("form[name='profile-form']");
//   const profileTitle = document.querySelector(".profile__title");
//   const profileDescription = document.querySelector(".profile__description");
//   const profileModal = document.querySelector("#profile-edit-modal");

//   // Save changes
//   profileForm.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent form submission

//     const newTitle = document.querySelector("#profile-title-input").value;
//     const newDescription = document.querySelector(
//       "#profile-description-input"
//     ).value;

//     // Update profile info
//     profileTitle.textContent = newTitle;
//     profileDescription.textContent = newDescription;

//     // Close modal
//     profileModal.classList.remove("modal_open");
//   });
// });
