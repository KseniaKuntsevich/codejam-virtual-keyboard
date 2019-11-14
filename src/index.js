import KeyBoard from './KeyBoard';
import enBoard from './data/en';
import rusBoard from './data/rus';

const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'boardTextarea');
document.body.appendChild(textarea);
textarea.focus();

const board = new KeyBoard([enBoard, rusBoard], textarea, document.body);
board.drawBoard();

const text = '<ul><li>To change lang: click/press CapsLock</li><li>To switch uppercase: double click/press CapsLock</li></ul>';
const note = document.createElement('div');
note.innerHTML = text;
document.body.appendChild(note);
