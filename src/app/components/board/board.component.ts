import { Component, OnInit } from '@angular/core';
import { CellEnum } from '../block/CellEnum';

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


  ngOnInit(): void {
    this.newGame();
  }

  get gameOver(): boolean{
    return this.isGameOver;
  }

  newGame() {
    this.board = [];
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = CellEnum.EMPTY
      }
    }
    this.currentPlayer = CellEnum.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;
  }

  move(row: number, col:number): void {
    if (!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      if (this.isDraw()) {
        this.statusMessage = 'It\'s a Draw!';
        this.isGameOver = true;
      } else if (this.isWin()) {
        this.statusMessage = `Player ${this.currentPlayer} won`;
        this.isGameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === CellEnum.X ? CellEnum.O : CellEnum.X;
      }
    }
  }

  isDraw():boolean{
    for (const colums of this.board) {
      for( const col of colums) {
        if (col === CellEnum.EMPTY){
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin(): boolean {
    for (const colums of this.board){
      if (colums[0] === colums[1] && colums[0] === colums[2] && colums[0] != CellEnum.EMPTY){
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
    ){
      return true;
    }
    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][2] &&
      this.board[0][2] !== CellEnum.EMPTY
    ){
      return true;
    }
    return false
  }
}
