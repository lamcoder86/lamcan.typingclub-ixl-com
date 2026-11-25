const profileMenu = document.querySelector(".profile-menu");
const profileButton = document.querySelector(".profile-button");

profileButton.addEventListener("click", () => {
  const isOpen = profileMenu.classList.toggle("is-open");
  profileButton.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (!profileMenu.contains(event.target)) {
    profileMenu.classList.remove("is-open");
    profileButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    profileMenu.classList.remove("is-open");
    profileButton.setAttribute("aria-expanded", "false");
    profileButton.focus();
  }
});
