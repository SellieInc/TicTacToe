// board.component.ts

import { Component, OnInit } from '@angular/core';
import { CellEnum } from '../block/CellEnum';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  private currentPlayer!: CellEnum;
  public board!: CellEnum[][];
  private isGameOver!: boolean;
  public statusMessage!: string;
  private isBotMode: boolean = false; 
  botTurn : boolean = false;

  constructor(public gameStateService: GameStateService) {
}

  ngOnInit(): void {
    this.isBotMode = this.gameStateService.isBotMode;
    this.newGame();
  }

  get gameOver(): boolean {
    return this.isGameOver;
  }

  newGame() {
    this.board = [];
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;
  }

  move(row: number, col: number): void {
    if (!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      if (this.isDraw()) {
        this.statusMessage = 'It\'s a Draw!';
        this.isGameOver = true;
      } else if (this.isWin()) {
        this.statusMessage = `Player ${this.currentPlayer} won`;
        this.gameStateService.incWins(this.currentPlayer)
        this.isGameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === CellEnum.X ? CellEnum.O : CellEnum.X;
        if (this.isBotMode && this.currentPlayer === CellEnum.O) {
          this.botTurn = true;
          this.statusMessage = `Player ${this.currentPlayer}'s turn`;
          setTimeout(() => this.botMove(), 1000); 
        }
      }
    }
  }

  isDraw(): boolean {
    for (const columns of this.board) {
      for (const col of columns) {
        if (col === CellEnum.EMPTY) {
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin(): boolean {
    for (const row of this.board) {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== CellEnum.EMPTY) {
        return true;
      }
    }

    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] !== CellEnum.EMPTY
      ) {
        return true;
      }
    }

    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== CellEnum.EMPTY
    ) {
      return true;
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0] &&
      this.board[0][2] !== CellEnum.EMPTY
    ) {
      return true;
    }

    return false;
  }

  botMove() {
    const bestMove = this.findBestMove();
    if (bestMove) {
      this.move(bestMove.row, bestMove.col);
    } else {
      const emptyCells = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.board[row][col] === CellEnum.EMPTY) {
            emptyCells.push({ row, col });
          }
        }
      }
  
      if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.move(row, col);
      }
    }
    this.botTurn = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;
  }
  
  findBestMove(): { row: number, col: number } | null {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === CellEnum.EMPTY) {
          this.board[row][col] = CellEnum.O;
          if (this.isWin()) {
            this.board[row][col] = CellEnum.EMPTY;
            return { row, col };
          }
          this.board[row][col] = CellEnum.EMPTY;
        }
      }
    }
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === CellEnum.EMPTY) {
          this.board[row][col] = CellEnum.X;
          if (this.isWin()) {
            this.board[row][col] = CellEnum.EMPTY;
            return { row, col };
          }
          this.board[row][col] = CellEnum.EMPTY;
        }
      }
    }
  
    if (this.board[1][1] === CellEnum.EMPTY) {
      return { row: 1, col: 1 };
    }
  
    const corners = [
      { row: 0, col: 0 }, { row: 0, col: 2 },
      { row: 2, col: 0 }, { row: 2, col: 2 }
    ];
    for (const corner of corners) {
      if (this.board[corner.row][corner.col] === CellEnum.EMPTY) {
        return corner;
      }
    }
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === CellEnum.EMPTY) {
          return { row, col };
        }
      }
    }
  
    return null;
  }
}
