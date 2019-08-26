export function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //from MDN The maximum is inclusive and the minimum is inclusive 
}
export function placeBoat(board, boatSize) {
    let placed = false,
        fullBoatLoc = [];
    while (!placed) {
        let boatLoc = [],
            randomRow = getRandomNumber(0, 5),
            randomCol = getRandomNumber(0, 5),
            randomDir = getRandomNumber(1, 4),
            randimDirForImage = (randomDir === 1 || randomDir === 2) ? "d" : "a",
            partOfImage = (randomDir === 1 || randomDir === 3) ? boatSize : 1;

        for (let i = 0; i < boatSize; i++) {
            if (i > 0) {
                switch (randomDir) {
                    case 1: randomRow--;
                        partOfImage--;
                        break;
                    case 2: randomRow++;
                        partOfImage++;
                        break;
                    case 3: randomCol--;
                        partOfImage--;
                        break;
                    case 4: randomCol++;
                        partOfImage++;
                }
            }
            if (randomRow < 0 || randomRow > 5 || randomCol < 0 || randomCol > 5 || board[randomRow][randomCol]) {
                break;
            } else {
                boatLoc.push({ randomRow: randomRow, randomCol: randomCol, image: ("" + randimDirForImage + partOfImage + boatSize) });
            }
        }
        if (boatLoc.length === boatSize) {


            boatLoc.forEach(spot => {
                board[spot.randomRow][spot.randomCol] = { boatSize: boatSize, image: spot.image };
            });
            placed = true;
            fullBoatLoc = boatLoc;
        }
    }

    return { board: board, fullBoatLoc: fullBoatLoc };
}
export function fillHiddenBoard(board, boatArray) {
    let totalSpots = 0,
        filledBoard = [],
        totalBoatLocs = [];
    boatArray.forEach(boat => {
        let tempBoard = placeBoat(board, boat);
        filledBoard = tempBoard.board;
        totalBoatLocs.push(tempBoard.fullBoatLoc);
        totalSpots += boat;
    });
    console.log(filledBoard, totalBoatLocs);
    return {
        hiddenBoard: filledBoard,
        totalSpots: totalSpots,
        totalBoatLocs: totalBoatLocs,
    };
}
export function getBoard(filler) {
    filler = filler ? filler : null;
    return [
        Array(6).fill(filler),
        Array(6).fill(filler),
        Array(6).fill(filler),
        Array(6).fill(filler),
        Array(6).fill(filler),
        Array(6).fill(filler),5
    ];
}

export function isWinner(totalSpots, hiddenBoard, visableBoard) {
    let currentSpotsFilled = 0;
    for (let hiddenRow = 0; hiddenRow < hiddenBoard.length; hiddenRow++) {
        for (let hiddenCol = 0; hiddenCol < hiddenBoard[hiddenRow].length; hiddenCol++) {
            if (hiddenBoard[hiddenRow][hiddenCol] && (visableBoard[hiddenRow][hiddenCol])) {
                if ((visableBoard[hiddenRow][hiddenCol].hit === "HIT")) {
                    currentSpotsFilled++;
                }
            }
        }
    }
    console.log("boat ", totalSpots, "currant ", currentSpotsFilled);
    return (totalSpots === currentSpotsFilled) ? true : false;
}
