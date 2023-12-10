import React, { useState } from 'react';

const COLUMN_COUNT = 7;
const ROW_COUNT = 6;

const Power4 = () => {
  const initialBoard = Array.from({ length: ROW_COUNT }, () => Array(COLUMN_COUNT).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState(1); // Player 1 starts

  const handleColumnClick = (col) => {
    const currentBoard = [...board];
    for (let row = ROW_COUNT - 1; row >= 0; row--) {
      if (!currentBoard[row][col]) {
        currentBoard[row][col] = player;
        setBoard(currentBoard);
        checkWinner(currentBoard, row, col);
        setPlayer(player === 1 ? 2 : 1);
        break;
      }
    }
  };

  const checkWinner = (currentBoard, row, col) => {
    if (
      checkVertical(currentBoard, row, col) ||
      checkHorizontal(currentBoard, row, col) ||
      checkDiagonal(currentBoard, row, col)
    ) {
      alert(`Player ${player} wins!`);
      setBoard(initialBoard);
      setPlayer(1);
    }
  };

  const checkVertical = (currentBoard, row, col) => {
    let count = 1;
    for (let i = row - 1; i >= 0; i--) {
      if (currentBoard[i][col] === player) {
        count++;
      } else {
        break;
      }
    }
    for (let i = row + 1; i < ROW_COUNT; i++) {
      if (currentBoard[i][col] === player) {
        count++;
      } else {
        break;
      }
    }
    return count >= 4;
  };

  const checkHorizontal = (currentBoard, row, col) => {
    let count = 1;
    for (let i = col - 1; i >= 0; i--) {
      if (currentBoard[row][i] === player) {
        count++;
      } else {
        break;
      }
    }
    for (let i = col + 1; i < COLUMN_COUNT; i++) {
      if (currentBoard[row][i] === player) {
        count++;
      } else {
        break;
      }
    }
    return count >= 4;
  };

  const checkDiagonal = (currentBoard, row, col) => {
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    for (let [x, y] of directions) {
      let count = 1;
      let r = row + x;
      let c = col + y;
      while (r >= 0 && r < ROW_COUNT && c >= 0 && c < COLUMN_COUNT) {
        if (currentBoard[r][c] === player) {
          count++;
        } else {
          break;
        }
        r += x;
        c += y;
      }
      r = row - x;
      c = col - y;
      while (r >= 0 && r < ROW_COUNT && c >= 0 && c < COLUMN_COUNT) {
        if (currentBoard[r][c] === player) {
          count++;
        } else {
          break;
        }
        r -= x;
        c -= y;
      }
      if (count >= 4) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="power4-container">
      <h2 className="game-title">Connect Four in Film Reel Style</h2>
      <div className="film-reel">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="film-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`film-cell ${cell === 1 ? 'player1' : cell === 2 ? 'player2' : ''}`}
                onClick={() => handleColumnClick(colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Power4;
