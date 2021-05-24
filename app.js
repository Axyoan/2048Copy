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

const changeColor = (cell, val) => {
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
    changeColor(frstCell, frstRet[2]);
    changeColor(sndCell, sndRet[2]);
}

initializeBoard();

const paintBoard = () => {
    for (let pos = 0; pos < 16; pos++) {
        changeColor(cells[pos], board[Math.floor(pos / 4)][pos % 4]);
    }

}

const keyUp = (e) => {
    console.log("wtf");
    console.log("up");
    for (let row = 1; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            board[0][col] += board[row][col];
        }
    }
    console.log(board);
    paintBoard();
}

const keyDown = (e) => {
    console.log("down");
}

const keyLeft = (e) => {
    console.log("left");
}

const keyRight = (e) => {
    console.log("right");
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
}

window.addEventListener('keydown', keydown);

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", (e) => {
    initializeBoard();
});