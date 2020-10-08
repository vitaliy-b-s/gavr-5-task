// Исходный массив
const fieldSize = 4;
let defaultGame = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let emptyIndex;

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

    for (let i = 0; i <= 15; i++) {
        const selectedElement = document.querySelector(`[data-id="${i}"]`);
        selectedElement.innerHTML = array[i];
        if (array[i] === 0) {
            selectedElement.style.border = "none";
            selectedElement.innerHTML = " ";
        }
    }
}

//Функция замены элементов в массиве
function onCellClick(event) {
    const targetIndex = event.target.dataset.id;
    const canSwap = canSwapElements(emptyIndex, targetIndex);
    if (canSwap) {
        swapElements(shuffledArray, targetIndex, emptyIndex);
        renderCells(shuffledArray)
        emptyIndex = findEmpty();

    }
}

function findEmpty() {
    return shuffledArray.findIndex(item => item == 0)
}

function canSwapElements(emptyIndex, targetIndex) {

    function extractRowAndColumn(index) {
        return {
            row: Math.floor(index / fieldSize),
            column: index % fieldSize
        }
    }

    const empty = extractRowAndColumn(emptyIndex);
    const target = extractRowAndColumn(targetIndex);

    if ((empty.column === target.column && Math.abs(target.row - empty.row) == 1)) {
        return true;
    } else if ((empty.row === target.row && Math.abs(empty.column - target.column) == 1)) {
        return true;
    }

    return false
}

function swapElements(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;

}

let shuffledArray = shuffleArray(defaultGame);
emptyIndex = findEmpty()
renderCells(shuffledArray);

document.querySelectorAll('.game-cell')
    .forEach(cell => cell.addEventListener('click', onCellClick))