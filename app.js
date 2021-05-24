let cells = document.querySelectorAll(".col");

let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let available = [];

const generateRandom = () => {
    const pos = Math.floor(Math.random() * available.length);
    const die = Math.random();
    const val = (die < .8) ? 2 : 4;
    let elimPos = available[pos];
    let rowElim = Math.floor(elimPos / 4);
    let colElim = elimPos % 4;
    board[rowElim][colElim] = val;
    available = available.filter((_, index) => {
        return index !== pos;
    });
    return [rowElim, colElim, val];
}

const updateCell = (cell, val) => {
    cell.classList.remove(`val-0`)
    for (let i = 2; i <= 2048; i *= 2) {
        cell.classList.remove(`val-${i}`)
    }
    cell.classList.add(`val-${val}`)
    cell.innerText = val;
};

const clearBoard = () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (cell of cells) {
        cell.classList.remove(`val-0`)
        for (let i = 2; i <= 2048; i *= 2) {
            cell.classList.remove(`val-${i}`);
        }
    }
}

const initializeBoard = () => {
    clearBoard();

    available = [];
    for (let i = 0; i < 16; i++) {
        available.push(i);
    }
    for (cell of cells) {
        cell.innerText = '0';
    }
    const frstRet = generateRandom();
    const sndRet = generateRandom();
    const str1 = `.row-${frstRet[0]} .col-${frstRet[1]}`;
    const str2 = `.row-${sndRet[0]} .col-${sndRet[1]}`;
    const frstCell = document.querySelector(str1);
    const sndCell = document.querySelector(str2);

    frstCell.innerText = frstRet[2];
    sndCell.innerText = sndRet[2];
    updateCell(frstCell, frstRet[2]);
    updateCell(sndCell, sndRet[2]);
}

initializeBoard();

const updateBoard = () => {
    for (let pos = 0; pos < 16; pos++) {
        updateCell(cells[pos], board[Math.floor(pos / 4)][pos % 4]);
    }

}



const updateAvailable = () => {
    available = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] == 0) {
                available.push(row * 4 + col);
            }
        }
    }
}

const gameOver = () => {

}

const keyUp = (e) => {
    console.log("up");

    let moved = false;
    for (let col = 0; col < 4; col++) {
        let lastIndex = 0;
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== 0 && (board[row][col] === board[lastIndex][col] || board[lastIndex][col] === 0)) {
                // Merge cells or the top one is 0
                board[lastIndex][col] += board[row][col];
                console.log(`Merge row: ${row}, col: ${col}, lastIndex: ${lastIndex} cell: ${board[lastIndex][col]}`);
                board[row][col] = 0;
                moved = true;
            }
            else if (board[row][col] !== 0) {
                //cell runs into an obstacle
                console.log(`float row: ${row}, col: ${col}, lastIndex: ${lastIndex}`);
                board[lastIndex + 1][col] = board[row][col];
                if (lastIndex + 1 !== row) {
                    board[row][col] = 0;
                }
                lastIndex++;
            }
        }
    }
    updateAvailable();
    if (moved) {
        generateRandom();
    }
    updateBoard();
}

const keyDown = (e) => {
    console.log("down");

    let moved = false;
    for (let col = 0; col < 4; col++) {
        let lastIndex = 3;
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== 0 && (board[row][col] === board[lastIndex][col] || board[lastIndex][col] === 0)) {
                // Merge cells or the top one is 0
                board[lastIndex][col] += board[row][col];
                console.log(`Merge row: ${row}, col: ${col}, lastIndex: ${lastIndex} cell: ${board[lastIndex][col]}`);
                board[row][col] = 0;
                moved = true;
            }
            else if (board[row][col] !== 0) {
                //cell runs into an obstacle
                console.log(`float row: ${row}, col: ${col}, lastIndex: ${lastIndex}`);
                board[lastIndex - 1][col] = board[row][col];
                if (lastIndex - 1 !== row) {
                    board[row][col] = 0;
                }
                lastIndex--;
            }
        }
    }
    updateAvailable();
    if (moved) {
        generateRandom();
    }
    updateBoard();
}

const keyLeft = (e) => {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let lastIndex = 0;
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== 0 && (board[row][col] === board[row][lastIndex] || board[row][lastIndex] === 0)) {
                // Merge cells or the top one is 0
                board[row][lastIndex] += board[row][col];
                console.log(`Merge row: ${row}, col: ${col}, lastIndex: ${lastIndex} cell: ${board[row][lastIndex]}`);
                board[row][col] = 0;
                moved = true;
            }
            else if (board[row][col] !== 0) {
                //cell runs into an obstacle
                console.log(`float row: ${row}, col: ${col}, lastIndex: ${lastIndex}`);
                board[row][lastIndex + 1] = board[row][col];
                if (lastIndex + 1 !== col) {
                    board[row][col] = 0;
                }
                lastIndex++;
            }
        }
    }
    updateAvailable();
    if (moved) {
        generateRandom();
    }
    updateBoard();
}

const keyRight = (e) => {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let lastIndex = 3;
        for (let col = 2; col >= 0; col--) {
            if (board[row][col] !== 0 && (board[row][col] === board[row][lastIndex] || board[row][lastIndex] === 0)) {
                // Merge cells or the top one is 0
                board[row][lastIndex] += board[row][col];
                console.log(`Merge row: ${row}, col: ${col}, lastIndex: ${lastIndex} cell: ${board[row][lastIndex]}`);
                board[row][col] = 0;
                moved = true;
            }
            else if (board[row][col] !== 0) {
                //cell runs into an obstacle
                console.log(`float row: ${row}, col: ${col}, lastIndex: ${lastIndex}`);
                board[row][lastIndex - 1] = board[row][col];
                if (lastIndex - 1 !== col) {
                    board[row][col] = 0;
                }
                lastIndex--;
            }
        }
    }
    updateAvailable();
    if (moved) {
        generateRandom();
    }
    updateBoard();
}


const keydown = (e) => {
    switch (e.code) {
        case "ArrowUp":
            keyUp();
            return;
        case "ArrowDown":
            keyDown();
            return;
        case "ArrowLeft":
            keyLeft();
            return;
        case "ArrowRight":
            keyRight();
            return;
    }
    if (available.length === 0) {
        gameOver();
    }
}

window.addEventListener('keydown', keydown);

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", (e) => {
    initializeBoard();
});



let testBoard = () => {
    board = [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
    ]
    board = [
        [16, 4, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    board = [
        [16, 4, 0, 0],
        [4, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    updateBoard();
}
