// Исходный массив
let defoultGame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

//Фунция перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Функция отрисовки перемешанного массива
function fillIngDivs(array) {
  for (let i = 0; i <= 15; i++) {
    document.querySelector(`[data-id="${i}"]`).innerHTML = array[i];
    if (array[i] === 0) {
      document.querySelector(`[data-id="${i}"]`).style.border = "none";
      document.querySelector(`[data-id="${i}"]`).innerHTML = " ";
    }
  }
}
// Начало игры
function startGame() {
  let shuffledArray = shuffleArray(defoultGame);
  fillIngDivs(shuffledArray);
}

//Функция замены элементов в массиве

startGame();
