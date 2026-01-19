import { Board } from './board';
export class Player {
  constructor(type, turn) {
    this.real = type;
    this.board = new Board();
    this.turn = turn;
  }
}
