let standartGame = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function fillingDivs(array) {
  for (let i = 0; i <= 15; i++) {
    document.querySelector(`[data-id = "${i}"]`).innerHTML = array[i];
  }
}

let shuffledArray = shuffleArray(standartGame);
fillingDivs(shuffledArray);
