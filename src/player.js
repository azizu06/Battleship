import { Board } from './board';
export class Player {
  constructor(type) {
    this.type = type;
    this.board = new Board();
  }
}
