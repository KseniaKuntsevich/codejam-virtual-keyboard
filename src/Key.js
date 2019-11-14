export default class Key {
  constructor(keyData, input) {
    this.keyData = keyData;
    this.input = input;
    this.element = null;
    this.inputContent = null;

    const createEl = () => {
      const keyDiv = document.createElement('div');
      keyDiv.classList.add('key');
      if (this.keyData.overClass) {
        keyDiv.classList.add(this.keyData.overClass);
      }
      if (this.keyData.code) {
        keyDiv.dataset.code = this.keyData.code;
      }
      keyDiv.dataset.keyCode = this.keyData.keyCode;
      this.element = keyDiv;
    };

    createEl();
  }

  quicAnimation() {
    this.activate();
    const unactivate = this.unactivate.bind(this);
    setTimeout(unactivate, 100);
  }

  onClick() {
    this.quicAnimation();
    const { input } = this;
    const { value } = input;
    let { selectionStart } = input;
    input.value = value.slice(0, selectionStart) + this.inputContent + value.slice(selectionStart);
    selectionStart += this.inputContent.length;
    input.selectionStart = selectionStart;
    input.selectionEnd = selectionStart;
  }

  setKey(isUpperCase = false, isCapsLockActive = false) {
    const { keyData } = this;
    const { key } = keyData;
    let myKey = keyData.key;
    let content = keyData.content ? keyData.content : null;

    if (!content) {
      if (Array.isArray(key)) {
        myKey = keyData.key[isUpperCase ? 1 : 0];
        const spanStart = '<span class="unActiveKey">';
        const spanEnd = '</span>';
        const inCapsLockOff = key[0] + spanStart + key[1] + spanEnd;
        const inCapsLockOn = spanStart + key[0] + spanEnd + key[1];
        content = isUpperCase ? inCapsLockOn : inCapsLockOff;
      } else if ((keyData.keyCode > 64 && keyData.keyCode < 91) || key.match(/ё|х|ъ|ж|э|б|ю/g)) {
        content = isUpperCase ? key.toUpperCase() : key;
        myKey = content;
      } else if (key === 'CapsLock') {
        const classDot = isCapsLockActive ? 'activeDot' : 'unactiveDot';
        const divStart = '<div class="dot ';
        const divEnd = '"></<div>';
        content = key + divStart + classDot + divEnd;
      } else {
        content = key;
      }
    }

    this.inputContent = keyData.inputContent || myKey;
    const kbd = document.createElement('kbd');
    kbd.innerHTML = content;
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.element.appendChild(kbd);
  }

  getEl() {
    return this.element;
  }

  activate() {
    this.element.classList.add('animate');
  }

  unactivate() {
    this.element.classList.remove('animate');
  }
}
