import React from 'react';
import './board.css';
import { Square } from '../square/square';

export class Board extends React.Component {
    renderSquare(row, col, value) {
        return (
            <Square
                id={("" + row + col)}
                value={value}
                onClick={() => this.props.onClick(row, col)}
            />
        );
    }

    renderBoard() {
        let fullBoard = [];
        for (let row = 0; row < this.props.visableBoard.length; row++) {
            let fullRow = [];
            for (let col = 0; col < this.props.visableBoard[row].length; col++) {
                fullRow.push(this.renderSquare(row, col, this.props.visableBoard[row][col]));
            }
            fullBoard.push(<div className="row">{fullRow}</div>);
        }
        return fullBoard;
    }
    render() {
        return (
            <div className="board">
                {this.renderBoard()}
            </div>

        );
    }
}