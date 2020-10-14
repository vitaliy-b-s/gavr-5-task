let shuffledArray;
let counter = 0;
let timeCounter;
let scoreArray = [];

let scorePosition = 0;

// Начало игры
function startGame() {
  clearInterval(timeCounter);
  document.getElementById("app").innerHTML = "";
  document.querySelector(".counter-value").value = counter;
  createHTMLStructure(createDefaultArray());
  shuffledArray = shuffleArray(createDefaultArray());
  renderCells(shuffledArray);
  setTimeCounter();
  emptyIndex = findEmpty(shuffledArray);
}

//Функция создания HTML структуры
function createHTMLStructure(array) {
  let container = document.getElementById("app");
  array.forEach((elem) => {
    let div = document.createElement("div");
    div.className = "game-cell";
    div.setAttribute("data-id", elem);
    container.appendChild(div);
    div.addEventListener("click", onCellClick);
  });
}

// Создание массива в согласно выбранной рамерности
function createDefaultArray() {
  defaultArray = [];
  fieldSize = +document.getElementById("game-type").value;
  for (let i = 0; i < fieldSize * fieldSize; i++) {
    defaultArray[i] = i;
  }
  return defaultArray;
}

//Фунция перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Функция отрисовки перемешанного массива
function renderCells(array) {
  let app = document.getElementById("app");
  let fieldSize = +document.getElementById("game-type").value;
  switch (fieldSize) {
    case 4:
      app.style.fontSize = "2.3em";
      break;
    case 5:
      app.style.fontSize = "2.0em";
      break;
    case 6:
      app.style.fontSize = "1.7em";
      break;
    case 7:
      app.style.fontSize = "1.4em";
      break;
    case 8:
      app.style.fontSize = "1.0em";
      break;
  }
  let cellSize = 296 / fieldSize + "px";
  for (let i = 0; i < array.length; i++) {
    const selectedElement = document.querySelector(`[data-id="${i}"]`);
    selectedElement.innerHTML = array[i];
    selectedElement.style.border = "0.5px solid black";
    selectedElement.style.backgroundColor = "rgb(232, 243, 132)";
    selectedElement.style.height = cellSize;
    selectedElement.style.width = cellSize;
  }
  let emptyElement = array.find((elem) => array[elem] == 0);

  const foundEmptyElem = document.querySelector(
    `[data-id = "${emptyElement}"]`
  );
  foundEmptyElem.style = "border: none";
  foundEmptyElem.innerHTML = "";
  foundEmptyElem.style.height = cellSize;
  foundEmptyElem.style.width = cellSize;
}
// Функция запуска счетчика и времени
function setTimeCounter() {
  let time = document.querySelector(".time-value");
  let second = 0;
  let minute = 0;
  time.value = minute + ":" + second;
  function startCounter() {
    time.value = minute + ":" + second;
    second++;
    if (second == 61) {
      second = 0;
      minute++;
    }
  }
  timeCounter = setInterval(startCounter, 1000);
  timeCounter;
}

//Функция счетчика шагов
function countSteps() {
  let count = document.querySelector(".counter-value");
  counter++;
  count.value = counter;
}

//Функция замены элементов в массиве
function onCellClick(event) {
  const targetIndex = event.target.dataset.id;
  const canSwap = canSwapElements(emptyIndex, targetIndex);
  if (canSwap) {
    countSteps();
    swapElements(shuffledArray, targetIndex, emptyIndex);
    renderCells(shuffledArray);
    emptyIndex = findEmpty(shuffledArray);
  }
  checkifWin();
}

//Функция поиска пустого элемента
function findEmpty(array) {
  return array.findIndex((item) => item == 0);
}

// Функция проверки на возможность премещения
function canSwapElements(emptyIndex, targetIndex) {
  function extractRowAndColumn(index) {
    fieldSize = +document.getElementById("game-type").value;
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

//Функция проверки выйгрышной комбинации
function checkifWin() {
  let currentArray = [];
  document.querySelectorAll(".game-cell").forEach((item) => {
    currentArray[item.dataset.id] = +item.innerHTML;
  });
  let defaultArray = createDefaultArray();
  defaultArray.shift();
  defaultArray.push(0);
  console.log(currentArray.splice(4), defaultArray.splice(4));
  if (JSON.stringify(currentArray) == JSON.stringify(defaultArray)) {
    alert("You win");
    clearInterval(timeCounter);
    createScorePosition();
    counter = 0;
  } else {
    return false;
  }
}

// Функция записи рекорда
function createScorePosition() {
  let player = prompt("Введите ваше имя", "");
  let score = document.querySelector(".counter-value").value;
  let time = document.querySelector(".time-value").value;

  scoreArray[counter] = {
    stepValue: score,
    timeValue: time,
    playerName: player,
  };

  let sortedScoreArray = scoreArray.sort((a, b) => {
    if (a.score < b.score) {
      return -1;
    } else if (a.score > b.score) {
      return 1;
    } else {
      return 0;
    }
  });
  localStorage.setItem("score", sortedScoreArray);
  renderScoreTable();
}

//Функция отрисовки таблицы рекордов
function renderScoreTable() {
  if (localStorage.getItem("score") == null) {
    return;
  }
  let scoreTable = document.querySelector(".score-table__rank");
  let array = localStorage.getItem("score");
  array.forEach((elememt) => {
    let li = document.createElement("li");
    li.className = "score-table__position";
    li.textContent =
      elememt.palyer + ":" + element.score + "шагов" + elememt.time + "времени";
    scoreTable.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderScoreTable);
