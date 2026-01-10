import { Board } from './board';
export class Player {
  constructor(type) {
    this.real = type;
    this.board = new Board();
  }
}
