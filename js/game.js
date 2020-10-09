// Начало игры
function startGame(defaultGame, fieldSize) {
  defaultGame = [];
  fieldSize = +document.getElementById("game-type").value;
  for (let i = 0; i < fieldSize * fieldSize; i++) {
    defaultGame[i] = i;
  }
  createHTMLStructure(defaultGame);
  let shuffledArray = shuffleArray(defaultGame);
  renderCells(shuffledArray);
  emptyIndex = findEmpty(shuffledArray);
  renderCells(shuffledArray);
}

//Фунция перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Функция создания HTML структуры
function createHTMLStructure(array) {
  let container = document.getElementById("app");
  let fieldSize = +document.getElementById("game-type").value;
  array.forEach((elem) => {
    let div = document.createElement("div");
    div.className = "game-cell";
    div.style.height = 598 / Math.sqrt(array.length) + "px";
    div.style.width = 598 / Math.sqrt(array.length) + "px";
    div.setAttribute("data-id", elem);
    container.appendChild(div);
  });
}

// Функция отрисовки перемешанного массива
function renderCells(array) {
  for (let i = 0; i < array.length; i++) {
    const selectedElement = document.querySelector(`[data-id="${i}"]`);
    selectedElement.innerHTML = array[i];
    selectedElement.style.border = "1px solid black";
  }
  let emptyElement = array.find((elem) => array[elem] == 0);
  document.querySelector(`[data-id = "${emptyElement}"]`).style =
    "border: none";
  document.querySelector(`[data-id = "${emptyElement}"]`).innerHTML = "";
}

//Функция замены элементов в массиве
function onCellClick(event) {
  const targetIndex = event.target.dataset.id;
  const canSwap = canSwapElements(emptyIndex, targetIndex);
  if (canSwap) {
    swapElements(shuffledArray, targetIndex, emptyIndex);
    renderCells(shuffledArray);
    emptyIndex = findEmpty();
  }
}

//Функция поиска пустого элемента
function findEmpty(array) {
  return array.findIndex((item) => item == 0);
}

// Функция проверки на возможность премещения
function canSwapElements(emptyIndex, targetIndex) {
  function extractRowAndColumn(index) {
    return {
      row: Math.floor(index / fieldSize),
      column: index % fieldSize,
    };
  }

  const empty = extractRowAndColumn(emptyIndex);
  const target = extractRowAndColumn(targetIndex);

  if (empty.column === target.column && Math.abs(target.row - empty.row) == 1) {
    return true;
  } else if (
    empty.row === target.row &&
    Math.abs(empty.column - target.column) == 1
  ) {
    return true;
  }

  return false;
}

//Функция премены элементов
function swapElements(array, firstIndex, secondIndex) {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

document
  .querySelectorAll(".game-cell")
  .forEach((cell) => cell.addEventListener("click", onCellClick));
