import Key from './Key';

export default class KeyBoard {
  constructor(boards, input, parent) {
    this.boards = boards;
    this.input = input;
    this.container = null;
    this.boardIndex = +(localStorage.getItem('activeIndex')) || 0;
    this.isCapsLockActive = JSON.parse(localStorage.getItem('isCLActive')) || false;
    this.isShiftActive = false;
    this.keys = {};
    this.capsLockClicks = 0;


    const containTo = parent || document.body;
    const container = document.createElement('div');
    containTo.appendChild(container);
    this.container = container;

    this.container.addEventListener('click', (e) => this.callOnClick(e));
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  callOnClick(e) {
    let { target } = e;
    let dataKeyCode = target.dataset.keyCode;

    while (!dataKeyCode && target !== this.container) {
      target = target.parentNode;
      dataKeyCode = target.dataset.keyCode;
    }

    const dataCode = target.dataset.code;
    const unicCode = dataCode || dataKeyCode;
    const key = this.keys[unicCode];

    if (!key) {
      return;
    }

    key.onClick();

    if (this.isShiftActive && key.keyData.key !== 'Shift') {
      this.changeShiftStatus();
    }
    this.input.focus();
  }

  changeLng() {
    const newindx = this.boardIndex === 1 ? 0 : 1;
    this.boardIndex = newindx;
    localStorage.setItem('activeIndex', newindx);
    this.drawBoard();
  }

  onKeyDown(e) {
    if (e.key === 'CapsLock') {
      this.listenCaosLock();
      return;
    }
    if (e.key === 'Shift') {
      this.changeShiftStatus();
      return;
    }

    const key = this.keys[e.code] || this.keys[e.keyCode];
    if (key) {
      key.activate();
      if (key.keyData.key === 'Tab') {
        e.preventDefault();
        key.onClick();
      }
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift' && this.isShiftActive) {
      this.changeShiftStatus();
      return;
    }

    const key = this.keys[e.code] || this.keys[e.keyCode];
    if (key) {
      key.unactivate();
    }
  }

  redraw() {
    const { isCapsLockActive } = this;
    const { isShiftActive } = this;
    const { keys } = this;
    Object.keys(keys).forEach((id) => {
      const isUpperCase = isShiftActive ? !isCapsLockActive : isCapsLockActive;
      const key = keys[id];
      key.setKey(isUpperCase, isCapsLockActive);

      if (key.keyData.key === 'Shift') {
        const func = isShiftActive ? key.activate : key.unactivate;
        func.call(key);
      }
    });
  }

  changeShiftStatus() {
    this.isShiftActive = !this.isShiftActive;
    this.redraw();
  }

  changeCapsLockStatus() {
    localStorage.setItem('isCLActive', !this.isCapsLockActive);
    this.isCapsLockActive = !this.isCapsLockActive;
    this.redraw();
  }

  listenCaosLock() {
    this.capsLockClicks += 1;
    if (this.capsLockClicks === 1) {
      setTimeout(() => {
        const func = this.capsLockClicks > 1 ? this.changeCapsLockStatus : this.changeLng;
        func.call(this);
        this.capsLockClicks = 0;
      }, 200);
    }
  }

  arrowOnClick() {
    let { selectionStart } = this.input;
    const { keyCode } = this.keyData;
    selectionStart = keyCode < 39 ? selectionStart - 1 : selectionStart + 1;
    this.input.selectionStart = selectionStart;
    this.input.selectionEnd = selectionStart;
  }

  deleteOnClick() {
    const { value } = this.input;
    const { selectionStart } = this.input;
    this.input.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);
    this.input.selectionStart = selectionStart - 1;
    this.input.selectionEnd = selectionStart - 1;
  }

  drawBoard() {
    this.container.innerHTML = '';
    const board = this.boards[this.boardIndex];

    board.forEach((keyRow) => {
      const row = document.createElement('div');
      row.className = 'key-row';
      keyRow.forEach((keyData) => {
        const isUpperCase = this.isShiftActive ? !this.isCapsLockActive : this.isCapsLockActive;

        const unicData = keyData.code || keyData.keyCode;
        if (this.keys[unicData]) {
          const key = this.keys[unicData];
          key.keyData = keyData;
          key.setKey(isUpperCase, this.isCapsLockActive);
          row.appendChild(key.getEl());
          return;
        }

        const key = new Key(keyData, this.input);
        key.setKey(isUpperCase, this.isCapsLockActive);

        switch (keyData.key) {
          case 'Backspace':
          case 'Delete':
            key.onClick = () => this.deleteOnClick();
            break;
          case 'ArrowRight':
          case 'ArrowLeft':
          case 'ArrowUp':
          case 'ArrowDown':
            key.onClick = this.arrowOnClick.bind(key);
            break;
          case 'CapsLock':
            key.onClick = () => this.listenCaosLock();
            break;
          case 'Shift':
            key.onClick = () => this.changeShiftStatus();
            break;
          case 'Alt':
          case 'Control':
          case 'Meta':
            key.onClick = key.quicAnimation;
            break;
          default:
            break;
        }

        row.appendChild(key.getEl());
        this.keys[unicData] = key;
      });

      this.container.appendChild(row);
    });
  }
}
