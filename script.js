const gameFrame = document.querySelector("#gameFrame");
const gameIframe = document.querySelector("#gameIframe");
const gameFallback = document.querySelector("#gameFallback");
const fullscreenButton = document.querySelector("#fullscreenButton");
const gameTitle = document.querySelector("#game-title");
const openGame = document.querySelector("#openGame");
const fallbackGameLink = document.querySelector("#fallbackGameLink");
const profileMenu = document.querySelector(".profile-menu");
const profileButton = document.querySelector(".profile-button");

const games = {
  "google-slides": {
    title: "Google Slides",
    url: "https://docs.google.com/presentation/create",
  },
  "snow-rider": {
    title: "Snow Rider",
    url: "https://snow-rider.net/",
  },
  minecraft: {
    title: "Minecraft 1.8",
    url: "https://eaglercraft.com/mc/1.8.8/",
  },
  "drive-mad": {
    title: "Drive Mad",
    url: "https://drivemad.com/",
  },
  "pac-man": {
    title: "Pac-Man",
    url: "https://freepacman.org/",
  },
};

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await gameFrame.requestFullscreen();
    }
  } catch {
    gameFrame.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

fullscreenButton.addEventListener("click", toggleFullscreen);

document.addEventListener("fullscreenchange", () => {
  const isFullscreen = document.fullscreenElement === gameFrame;
  fullscreenButton.setAttribute("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
  fullscreenButton.querySelector("span").textContent = isFullscreen ? "Exit" : "Fullscreen";
});

function selectGame(gameId) {
  const game = games[gameId];
  if (!game) return;

  gameTitle.textContent = game.title;
  gameIframe.title = `Play ${game.title}`;
  gameFallback.hidden = true;
  openGame.href = game.url;
  fallbackGameLink.href = game.url;
  fallbackGameLink.textContent = `Play ${game.title}`;
  gameIframe.src = game.url;
  profileMenu.classList.remove("is-open");
  profileButton.setAttribute("aria-expanded", "false");
}

document.querySelectorAll("[data-game]").forEach((button) => {
  button.addEventListener("click", () => selectGame(button.dataset.game));
});

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

let iframeLoaded = false;
gameIframe.addEventListener("load", () => {
  iframeLoaded = true;
});

setTimeout(() => {
  if (!iframeLoaded) {
    gameFallback.hidden = false;
  }
}, 8000);
