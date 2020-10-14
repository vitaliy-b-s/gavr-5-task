function hideMenu() {
  document.querySelector(".menu-container").style.display = "none";
  document.querySelector(".application").style.display = "flex";
}

function openScoresTable() {
  document.querySelector(".menu-container").style.display = "none";
  document.querySelector(".application").style.display = "none";
  document.querySelector(".score-table__container").style.display = "flex";
}

function openMenu() {
  document.querySelector(".menu-container").style.display = "flex";
  document.querySelector(".application").style.display = "none";
  document.querySelector(".score-table__container").style.display = "none";
}
