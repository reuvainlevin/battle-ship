import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as tools from './tools';
import { Board } from './board/board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.boats = [2, 3, 3, 4];
        this.hiddenBoardAndBoatAmount = {};
        this.playing = false;
        this.gameOver = false;
        this.speedLevel = 6000;
        this.boatsToPlace = this.boats.slice();
        this.boatLevel = 0;
        this.fullBoatArray = [];
        this.targetedBoats = [];
        this.state = {
            visableBoard: tools.getBoard(null),
            status: "",
            playButton: "New Game",
            playPauseButton: <span>&#x2225;</span>,
            boatsInPlay: "0",
            numOfBoatsFound: 0,
            display: "none",
            gameInfoDisplay: "block",
            level: 1
        };
    }
    setDefaults() {
        this.hiddenBoardAndBoatAmount = {};
        this.speedLevel = 6000;
        this.boatsToPlace = this.boats.slice();
        this.playing = false;
        this.gameOver = false;
        this.boatLevel = 0;
        this.fullBoatArray = [];
        this.targetedBoats = [];
        this.setState({
            visableBoard: tools.getBoard(),
            status: "",
            playButton: "New Game",
            numOfBoatsFound: 0,
            playPauseButton: <span>&#x2225;</span>,
            boatsInPlay: "0",
            display: "none",
            gameInfoDisplay: "none",
            level: 1
        });
    }
    gameInfo() {
        return (
            <div>
                <p className="header">ROGUE BATTLESHIP</p>
                <p className="header2">How To Play:</p>
                <p>1- Click around the board to find your ships</p>
                <p>2- The top bar will tell you how many boats you have left to find</p>
                <p>3-  Watch Out! Exploding bombs could sink parts of your ships</p>
                <p>4- Be Quick! If an entire ship is sunk, it will change locations!</p>
                <p className="header2">Each level will challenge you with more boats and faster bombs. Can you keep up?</p>
                <p>GET READY TO BATTLE!</p>
                <button onClick={() => this.startPlay(true)}>&#9658;</button>
            </div>
        );
    }
    createLevel() {
        if (this.boatLevel > 0) {
            this.speedLevel -= 1300;
            this.boatsToPlace.push(this.boatsToPlace[this.boatLevel - 1]);
        }
        this.hiddenBoardAndBoatAmount = tools.fillHiddenBoard(tools.getBoard(), this.boatsToPlace);
        this.fullBoatArray = this.hiddenBoardAndBoatAmount.totalBoatLocs.slice();
        this.boatLevel++;
        this.targetedBoats = [];
    }
    handleClick(row, col) {
        if (this.playing) {
            if (this.hiddenBoardAndBoatAmount.hiddenBoard[row][col]) {
                this.changeValueToVisableBoard(row, col, { hit: "HIT", image: this.hiddenBoardAndBoatAmount.hiddenBoard[row][col].image });
                this.updateTargetedBoats(row, col);
                this.updateNumOfBoatsFound();
                if (tools.isWinner(this.hiddenBoardAndBoatAmount.totalSpots, this.hiddenBoardAndBoatAmount.hiddenBoard, this.state.visableBoard)) {
                    (this.boatLevel === 5) ? this.endLevel(true) : this.endLevel();// true for game over
                }
            } else {
                this.changeValueToVisableBoard(row, col, { hit: "Miss.." });
                setTimeout(() => {
                    this.changeValueToVisableBoard(row, col, null);
                }, 500);
            }
        }
    }
    updateTargetedBoats(row, col) {
        if (this.fullBoatArray.length >= 1) {
            for (let i = 0; i < this.fullBoatArray.length; i++) {
                this.fullBoatArray[i].forEach(boatSpot => {
                    if ((boatSpot.randomRow === row) && (boatSpot.randomCol === col)) {
                        let allreadyTargeted = false;
                        this.targetedBoats.forEach(target => {
                            if (target === i) {
                                allreadyTargeted = true;
                            }
                        });
                        if (!allreadyTargeted) {
                            this.targetedBoats.push(i);
                        }
                    }
                });
            }
        }
    }
    startPlay(startNewGame) {
        if (startNewGame) {
            this.stopBomber();
            this.setDefaults();
        }
        this.createLevel();
        this.playing = true;
        this.startBomber();

        this.setState({
            visableBoard: tools.getBoard(null),
            playButton: "Restart Game",
            boatsInPlay: this.boatsToPlace.length,
            display: "none",
            numOfBoatsFound: 0,
            level: this.boatLevel
        });
    }
    playPause() {
        if (this.playing) {
            this.stopBomber();
            this.setState({
                playPauseButton: <span>&#9658;</span>
            });
        } else {
            this.startBomber();
            this.setState({
                playPauseButton: <span>&#x2225;</span>
            });
        }
        this.playing = !this.playing;
    }
    updateNumOfBoatsFound() {
        let totalBoatsFound = 0;
        this.fullBoatArray.forEach(boat => {
            let addThisBoat = true;
            boat.forEach(spot => {
                if (this.state.visableBoard[spot.randomRow][spot.randomCol]) {
                    if (this.state.visableBoard[spot.randomRow][spot.randomCol].hit !== "HIT") {
                        addThisBoat = false;
                    }
                } else {
                    addThisBoat = false;
                }
            });
            if (addThisBoat) {
                totalBoatsFound++;
            }
        });
        this.setState({
            numOfBoatsFound: totalBoatsFound,
        });
    }
    stopBomber() {
        clearInterval(this.bomber);
        this.bombing = false;
    }
    startBomber() {
        if (!this.bombing) {
            this.bomber = setInterval(() => {
                this.shootAtBoard();
            }, this.speedLevel);
            this.bombing = true;
        }
    }
    shootAtBoard() {
        let row = tools.getRandomNumber(0, 5);
        let col = tools.getRandomNumber(0, 5);
        this.changeValueToVisableBoard(row, col, { hit: "BOOM" });
        this.checkIfNeedsToBeReplaced();
        this.updateNumOfBoatsFound();
        setTimeout(() => {
            this.changeValueToVisableBoard(row, col, null);
        }, 800);
    }
    checkIfNeedsToBeReplaced() {
        for (let i = 0; i < this.targetedBoats.length; i++) {
            let needsToBeReplaced = true;
            this.fullBoatArray[this.targetedBoats[i]].forEach(boatSpot => {
                if (this.state.visableBoard[boatSpot.randomRow][boatSpot.randomCol]) {
                    if (this.state.visableBoard[boatSpot.randomRow][boatSpot.randomCol].hit === "HIT") {
                        needsToBeReplaced = false;
                    }
                }
            });
            if (needsToBeReplaced) {
                this.fullBoatArray[this.targetedBoats[i]].forEach(boatSpot => {
                    this.hiddenBoardAndBoatAmount.hiddenBoard[boatSpot.randomRow][boatSpot.randomCol] = null;
                });
                let newBoard = tools.placeBoat(this.hiddenBoardAndBoatAmount.hiddenBoard, this.fullBoatArray[this.targetedBoats[i]].length);
                this.hiddenBoardAndBoatAmount.hiddenBoard = newBoard.board;
                this.fullBoatArray.splice(this.targetedBoats[i], 1, newBoard.fullBoatLoc);
                this.targetedBoats.splice(i, 1);
            }
        }
    }
    playNextLevel(startNewGame) {
        this.startPlay(startNewGame);
        this.togglePopUp();
    }
    endLevel(gameOver) {
        if (gameOver) {
            this.setState({
                status: "YOU BEAT THE GAME !!! GREAT JOB!!!",
            });
            this.gameOver = true;
            this.togglePopUp();
            this.playing = false;
            this.stopBomber();
        } else {
            this.setState({
                status: "YOU PASSED LEVEL " + this.boatLevel + "!! GREAT JOB!!",
            });
            this.togglePopUp();
            this.playing = false;
            this.stopBomber();
        }
    }
    buttonsForPopUp() {
        if (this.gameOver) {
            return (
                <div>
                    <p>{this.state.status}</p>
                    <button onClick={() => this.playNextLevel(true)}>New Game</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{this.state.status}</p>
                    <button onClick={() => this.playNextLevel()}>Next Level >></button>
                </div>
            );
        }
    }
    togglePopUp() {
        this.setState({
            display: (this.state.display === "none") ? "block" : "none",
        });
    }
    changeValueToVisableBoard(row, col, val) {
        val = val ? val : null;
        let cuurantBoard = this.state.visableBoard;
        cuurantBoard[row][col] = val;
        this.setState({
            visableBoard: cuurantBoard,
        });
    }
    render() {
        return (
            <div className="game">
                <div className="stats">
                    <button onClick={() => this.startPlay(true)}> {/* true for begining of game*/}
                        {this.state.playButton}</button>
                    <button onClick={() => this.playPause()}>
                        {this.state.playPauseButton}</button>
                    <p>Level: {this.state.level} /6 </p>
                    <p>Boats found: {this.state.numOfBoatsFound}/{this.state.boatsInPlay}</p>
                </div>
                <Board
                    visableBoard={this.state.visableBoard}
                    onClick={(row, col) => this.handleClick(row, col)}
                />
                <div className="disabler" style={{ display: this.state.display }}>
                    {this.buttonsForPopUp()}
                </div>
                <div className="disabler" style={{ display: this.state.gameInfoDisplay }}>
                    {this.gameInfo()}
                </div>
            </div>

        );
    }
}
// ================================================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

