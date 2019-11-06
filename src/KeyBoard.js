import Key from './Key';

export default class KeyBoard {
  constructor(boards, input, parent) {
    this.boards = boards;
    this.input = input;
    this.container = null;
    this.boardIndex = +(localStorage.getItem('activeIndex')) || 0;
    this.keys = {};

    const containTo = parent || document.body;
    const container = document.createElement('div');
    containTo.appendChild(container);
    this.container = container;

    this.container.addEventListener('click', (e) => this.callOnClick(e));
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  callOnClick(e) {
  }


  onKeyDown(e) {
  }

  onKeyUp(e) {
  }

  
  drawBoard() {
  }
}
