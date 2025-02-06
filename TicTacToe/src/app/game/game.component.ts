import { Component } from '@angular/core';
import { NgForOfContext, NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-game',
  imports: [NgIf, NgFor],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: '❤' | '☮' = '❤';
  winner: string | null = null;

  makeMove(index: number) {
    if (this.board[index] || this.winner) return;

    this.board[index] = this.currentPlayer;
    this.checkWinner();
    this.currentPlayer = this.currentPlayer === '❤' ? '☮' : '❤';
  }

  checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] //glavna i sporedna
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winner = this.board[a];
        return;
      }
    }

    let isDraw = true;
    for (const cell of this.board) {
      if (!cell) {
        isDraw = false;
        break;
      }
    }
    if (isDraw) {
      this.winner = 'draw';
    }
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = '❤';
    this.winner = null;
  }
}
