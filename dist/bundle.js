/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Key.js":
/*!********************!*\
  !*** ./src/Key.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Key; });\nclass Key {\n  constructor(keyData, input) {\n    this.keyData = keyData;\n    this.input = input;\n    this.element = null;\n    this.inputContent = null;\n\n    const createEl = () => {\n      const keyDiv = document.createElement('div');\n      keyDiv.classList.add('key');\n      if (this.keyData.overClass) {\n        keyDiv.classList.add(this.keyData.overClass);\n      }\n      if (this.keyData.code) {\n        keyDiv.dataset.code = this.keyData.code;\n      }\n      keyDiv.dataset.keyCode = this.keyData.keyCode;\n      this.element = keyDiv;\n    };\n\n    createEl();\n  }\n\n  quicAnimation() {\n    this.activate();\n    const unactivate = this.unactivate.bind(this);\n    setTimeout(unactivate, 100);\n  }\n\n  onClick() {\n    this.quicAnimation();\n    const { input } = this;\n    const { value } = input;\n    let { selectionStart } = input;\n    input.value = value.slice(0, selectionStart) + this.inputContent + value.slice(selectionStart);\n    selectionStart += this.inputContent.length;\n    input.selectionStart = selectionStart;\n    input.selectionEnd = selectionStart;\n  }\n\n  setKey(isUpperCase = false, isCapsLockActive = false) {\n    const { keyData } = this;\n    const { key } = keyData;\n    let myKey = keyData.key;\n    let content = keyData.content ? keyData.content : null;\n\n    if (!content) {\n      if (Array.isArray(key)) {\n        myKey = keyData.key[isUpperCase ? 1 : 0];\n        const spanStart = '<span class=\"unActiveKey\">';\n        const spanEnd = '</span>';\n        const inCapsLockOff = key[0] + spanStart + key[1] + spanEnd;\n        const inCapsLockOn = spanStart + key[0] + spanEnd + key[1];\n        content = isUpperCase ? inCapsLockOn : inCapsLockOff;\n      } else if ((keyData.keyCode > 64 && keyData.keyCode < 91) || key.match(/ё|х|ъ|ж|э|б|ю/g)) {\n        content = isUpperCase ? key.toUpperCase() : key;\n        myKey = content;\n      } else if (key === 'CapsLock') {\n        const classDot = isCapsLockActive ? 'activeDot' : 'unactiveDot';\n        const divStart = '<div class=\"dot ';\n        const divEnd = '\"></<div>';\n        content = key + divStart + classDot + divEnd;\n      } else {\n        content = key;\n      }\n    }\n\n    this.inputContent = keyData.inputContent || myKey;\n    const kbd = document.createElement('kbd');\n    kbd.innerHTML = content;\n    while (this.element.firstChild) {\n      this.element.removeChild(this.element.firstChild);\n    }\n    this.element.appendChild(kbd);\n  }\n\n  getEl() {\n    return this.element;\n  }\n\n  activate() {\n    this.element.classList.add('animate');\n  }\n\n  unactivate() {\n    this.element.classList.remove('animate');\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Key.js?");

/***/ }),

/***/ "./src/KeyBoard.js":
/*!*************************!*\
  !*** ./src/KeyBoard.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return KeyBoard; });\n/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Key */ \"./src/Key.js\");\n\n\nclass KeyBoard {\n  constructor(boards, input, parent) {\n    this.boards = boards;\n    this.input = input;\n    this.container = null;\n    this.boardIndex = +(localStorage.getItem('activeIndex')) || 0;\n    this.isCapsLockActive = JSON.parse(localStorage.getItem('isCLActive')) || false;\n    this.isShiftActive = false;\n    this.keys = {};\n    this.capsLockClicks = 0;\n\n\n    const containTo = parent || document.body;\n    const container = document.createElement('div');\n    containTo.appendChild(container);\n    this.container = container;\n\n    this.container.addEventListener('click', (e) => this.callOnClick(e));\n    document.addEventListener('keydown', (e) => this.onKeyDown(e));\n    document.addEventListener('keyup', (e) => this.onKeyUp(e));\n  }\n\n  callOnClick(e) {\n    let { target } = e;\n    let dataKeyCode = target.dataset.keyCode;\n\n    while (!dataKeyCode && target !== this.container) {\n      target = target.parentNode;\n      dataKeyCode = target.dataset.keyCode;\n    }\n\n    const dataCode = target.dataset.code;\n    const unicCode = dataCode || dataKeyCode;\n    const key = this.keys[unicCode];\n\n    if (!key) {\n      return;\n    }\n\n    key.onClick();\n\n    if (this.isShiftActive && key.keyData.key !== 'Shift') {\n      this.changeShiftStatus();\n    }\n    this.input.focus();\n  }\n\n  changeLng() {\n    const newindx = this.boardIndex === 1 ? 0 : 1;\n    this.boardIndex = newindx;\n    localStorage.setItem('activeIndex', newindx);\n    this.drawBoard();\n  }\n\n  onKeyDown(e) {\n    if (e.key === 'CapsLock') {\n      this.listenCaosLock();\n      return;\n    }\n    if (e.key === 'Shift') {\n      this.changeShiftStatus();\n      return;\n    }\n\n    const key = this.keys[e.code] || this.keys[e.keyCode];\n    if (key) {\n      key.activate();\n      if (key.keyData.key === 'Tab') {\n        e.preventDefault();\n        key.onClick();\n      }\n    }\n  }\n\n  onKeyUp(e) {\n    if (e.key === 'Shift' && this.isShiftActive) {\n      this.changeShiftStatus();\n      return;\n    }\n\n    const key = this.keys[e.code] || this.keys[e.keyCode];\n    if (key) {\n      key.unactivate();\n    }\n  }\n\n  redraw() {\n    const { isCapsLockActive } = this;\n    const { isShiftActive } = this;\n    const { keys } = this;\n    Object.keys(keys).forEach((id) => {\n      const isUpperCase = isShiftActive ? !isCapsLockActive : isCapsLockActive;\n      const key = keys[id];\n      key.setKey(isUpperCase, isCapsLockActive);\n\n      if (key.keyData.key === 'Shift') {\n        const func = isShiftActive ? key.activate : key.unactivate;\n        func.call(key);\n      }\n    });\n  }\n\n  changeShiftStatus() {\n    this.isShiftActive = !this.isShiftActive;\n    this.redraw();\n  }\n\n  changeCapsLockStatus() {\n    localStorage.setItem('isCLActive', !this.isCapsLockActive);\n    this.isCapsLockActive = !this.isCapsLockActive;\n    this.redraw();\n  }\n\n  listenCaosLock() {\n    this.capsLockClicks += 1;\n    if (this.capsLockClicks === 1) {\n      setTimeout(() => {\n        const func = this.capsLockClicks > 1 ? this.changeCapsLockStatus : this.changeLng;\n        func.call(this);\n        this.capsLockClicks = 0;\n      }, 200);\n    }\n  }\n\n  arrowOnClick() {\n    let { selectionStart } = this.input;\n    const { keyCode } = this.keyData;\n    selectionStart = keyCode < 39 ? selectionStart - 1 : selectionStart + 1;\n    this.input.selectionStart = selectionStart;\n    this.input.selectionEnd = selectionStart;\n  }\n\n  deleteOnClick() {\n    const { value } = this.input;\n    const { selectionStart } = this.input;\n    this.input.value = value.slice(0, selectionStart - 1) + value.slice(selectionStart);\n    this.input.selectionStart = selectionStart - 1;\n    this.input.selectionEnd = selectionStart - 1;\n  }\n\n  drawBoard() {\n    this.container.innerHTML = '';\n    const board = this.boards[this.boardIndex];\n\n    board.forEach((keyRow) => {\n      const row = document.createElement('div');\n      row.className = 'key-row';\n      keyRow.forEach((keyData) => {\n        const isUpperCase = this.isShiftActive ? !this.isCapsLockActive : this.isCapsLockActive;\n\n        const unicData = keyData.code || keyData.keyCode;\n        if (this.keys[unicData]) {\n          const key = this.keys[unicData];\n          key.keyData = keyData;\n          key.setKey(isUpperCase, this.isCapsLockActive);\n          row.appendChild(key.getEl());\n          return;\n        }\n\n        const key = new _Key__WEBPACK_IMPORTED_MODULE_0__[\"default\"](keyData, this.input);\n        key.setKey(isUpperCase, this.isCapsLockActive);\n\n        switch (keyData.key) {\n          case 'Backspace':\n          case 'Delete':\n            key.onClick = () => this.deleteOnClick();\n            break;\n          case 'ArrowRight':\n          case 'ArrowLeft':\n          case 'ArrowUp':\n          case 'ArrowDown':\n            key.onClick = this.arrowOnClick.bind(key);\n            break;\n          case 'CapsLock':\n            key.onClick = () => this.listenCaosLock();\n            break;\n          case 'Shift':\n            key.onClick = () => this.changeShiftStatus();\n            break;\n          case 'Alt':\n          case 'Control':\n          case 'Meta':\n            key.onClick = key.quicAnimation;\n            break;\n          default:\n            break;\n        }\n\n        row.appendChild(key.getEl());\n        this.keys[unicData] = key;\n      });\n\n      this.container.appendChild(row);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/KeyBoard.js?");

/***/ }),

/***/ "./src/data/en.js":
/*!************************!*\
  !*** ./src/data/en.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n  [\n    { key: ['§', '±'], keyCode: 192 },\n    { key: [1, '!'], keyCode: 49 },\n    { key: [2, '@'], keyCode: 50 },\n    { key: [3, '#'], keyCode: 51 },\n    { key: [4, '$'], keyCode: 52 },\n    { key: [5, '%'], keyCode: 53 },\n    { key: [6, '^'], keyCode: 54 },\n    { key: [7, '&'], keyCode: 55 },\n    { key: [8, '*'], keyCode: 56 },\n    { key: [9, '('], keyCode: 57 },\n    { key: [0, ')'], keyCode: 48 },\n    { key: ['-', '_'], keyCode: 189 },\n    { key: ['=', '+'], keyCode: 187 },\n    { key: 'Backspace', keyCode: 8 },\n  ],\n  [\n    { key: 'Tab', keyCode: 9, inputContent: '    ' },\n    { key: 'q', keyCode: 81 },\n    { key: 'w', keyCode: 87 },\n    { key: 'e', keyCode: 69 },\n    { key: 'r', keyCode: 82 },\n    { key: 't', keyCode: 84 },\n    { key: 'y', keyCode: 89 },\n    { key: 'u', keyCode: 85 },\n    { key: 'i', keyCode: 73 },\n    { key: 'o', keyCode: 79 },\n    { key: 'p', keyCode: 80 },\n    { key: ['[', '{'], keyCode: 219 },\n    { key: [']', '}'], keyCode: 221 },\n    { key: 'Delete', keyCode: 46 },\n  ],\n  [\n    { key: 'CapsLock', keyCode: 20 },\n    { key: 'a', keyCode: 65 },\n    { key: 's', keyCode: 83 },\n    { key: 'd', keyCode: 68 },\n    { key: 'f', keyCode: 70 },\n    { key: 'g', keyCode: 71 },\n    { key: 'h', keyCode: 72 },\n    { key: 'j', keyCode: 74 },\n    { key: 'k', keyCode: 75 },\n    { key: 'l', keyCode: 76 },\n    { key: [';', ':'], keyCode: 186 },\n    { key: [\"'\", '\"'], keyCode: 222 },\n    { key: ['\\\\', '|'], keyCode: 220 },\n    { key: 'Enter', keyCode: 13, inputContent: '\\n' },\n  ],\n  [\n    { key: 'Shift', keyCode: 16, code: 'ShiftLeft' },\n    { key: ['`', '~'], keyCode: 192, code: 'intlBackslash' },\n    { key: 'z', keyCode: 90 },\n    { key: 'x', keyCode: 88 },\n    { key: 'c', keyCode: 67 },\n    { key: 'v', keyCode: 86 },\n    { key: 'b', keyCode: 66 },\n    { key: 'n', keyCode: 78 },\n    { key: 'm', keyCode: 77 },\n    { key: [',', '<'], keyCode: 188 },\n    { key: ['.', '>'], keyCode: 190 },\n    { key: ['/', '?'], keyCode: 190, code: 'Slash' },\n    {\n      key: 'ArrowUp', keyCode: 38, code: 'ArrowUp', content: '▲',\n    },\n    { key: 'Shift', keyCode: 16, code: 'ShiftRight' },\n  ],\n  [\n    { key: 'Control', keyCode: 17, code: 'ControlLeft' },\n    { key: 'Alt', keyCode: 18, code: 'AltLeft' },\n    { key: 'Meta', keyCode: 91, code: 'MetaLeft' },\n    { key: ' ', keyCode: 32, overClass: 'space' },\n    { key: 'Meta', keyCode: 93, code: 'MetaRight' },\n    { key: 'Alt', keyCode: 18, code: 'AltRight' },\n    {\n      key: 'ArrowLeft', keyCode: 37, code: 'ArrowLeft', content: '◄', overClass: 'arrow',\n    },\n    {\n      key: 'ArrowDown', keyCode: 40, code: 'ArrowDown', content: '▼', overClass: 'arrowDown',\n    },\n    {\n      key: 'ArrowRight', keyCode: 39, code: 'ArrowRight', content: '►', overClass: 'arrow',\n    },\n  ],\n]);\n\n\n//# sourceURL=webpack:///./src/data/en.js?");

/***/ }),

/***/ "./src/data/rus.js":
/*!*************************!*\
  !*** ./src/data/rus.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([\n  [\n    { key: 'ё', keyCode: 192 },\n    { key: [1, '!'], keyCode: 49 },\n    { key: [2, '\"'], keyCode: 50 },\n    { key: [3, '№'], keyCode: 51 },\n    { key: [4, ';'], keyCode: 52 },\n    { key: [5, '%'], keyCode: 53 },\n    { key: [6, ':'], keyCode: 54 },\n    { key: [7, '?'], keyCode: 55 },\n    { key: [8, '*'], keyCode: 56 },\n    { key: [9, '('], keyCode: 57 },\n    { key: [0, ')'], keyCode: 48 },\n    { key: ['-', '_'], keyCode: 189 },\n    { key: ['=', '+'], keyCode: 187 },\n    { key: 'Backspace', keyCode: 8 },\n  ],\n\n  [\n    { key: 'Tab', keyCode: 9, inputContent: '    ' },\n    { key: 'й', keyCode: 81 },\n    { key: 'ц', keyCode: 87 },\n    { key: 'у', keyCode: 69 },\n    { key: 'к', keyCode: 82 },\n    { key: 'е', keyCode: 84 },\n    { key: 'н', keyCode: 89 },\n    { key: 'г', keyCode: 85 },\n    { key: 'ш', keyCode: 73 },\n    { key: 'щ', keyCode: 79 },\n    { key: 'з', keyCode: 80 },\n    { key: 'х', keyCode: 219 },\n    { key: 'ъ', keyCode: 221 },\n    { key: 'Delete', keyCode: 46 },\n  ],\n\n  [\n    { key: 'CapsLock', keyCode: 20 },\n    { key: 'ф', keyCode: 65 },\n    { key: 'ы', keyCode: 83 },\n    { key: 'в', keyCode: 68 },\n    { key: 'а', keyCode: 70 },\n    { key: 'п', keyCode: 71 },\n    { key: 'р', keyCode: 72 },\n    { key: 'о', keyCode: 74 },\n    { key: 'л', keyCode: 75 },\n    { key: 'д', keyCode: 76 },\n    { key: 'ж', keyCode: 186 },\n    { key: 'э', keyCode: 222 },\n    { key: ['\\\\', '/'], keyCode: 220 },\n    { key: 'Enter', keyCode: 13, inputContent: '\\n' },\n  ],\n\n  [\n    { key: 'Shift', keyCode: 16, code: 'ShiftLeft' },\n    { key: [']', '['], keyCode: 192, code: 'intlBackslash' },\n    { key: 'я', keyCode: 90 },\n    { key: 'ч', keyCode: 88 },\n    { key: 'с', keyCode: 67 },\n    { key: 'м', keyCode: 86 },\n    { key: 'и', keyCode: 66 },\n    { key: 'т', keyCode: 78 },\n    { key: 'ь', keyCode: 77 },\n    { key: 'б', keyCode: 188 },\n    { key: 'ю', keyCode: 190 },\n    { key: ['.', ','], keyCode: 190, code: 'Slash' },\n    {\n      key: 'ArrowUp', keyCode: 38, code: 'ArrowUp', content: '▲',\n    },\n    { key: 'Shift', keyCode: 16, code: 'ShiftRight' },\n  ],\n\n  [\n    { key: 'Control', keyCode: 17, code: 'ControlLeft' },\n    { key: 'Alt', keyCode: 18, code: 'AltLeft' },\n    { key: 'Meta', keyCode: 91, code: 'MetaLeft' },\n    { key: ' ', keyCode: 32, overClass: 'space' },\n    { key: 'Meta', keyCode: 93, code: 'MetaRight' },\n    { key: 'Alt', keyCode: 18, code: 'AltRight' },\n    {\n      key: 'ArrowLeft', keyCode: 37, code: 'ArrowLeft', content: '◄', overClass: 'arrow',\n    },\n    {\n      key: 'ArrowDown', keyCode: 40, code: 'ArrowDown', content: '▼', overClass: 'arrowDown',\n    },\n    {\n      key: 'ArrowRight', keyCode: 39, code: 'ArrowRight', content: '►', overClass: 'arrow',\n    },\n  ],\n\n]);\n\n\n//# sourceURL=webpack:///./src/data/rus.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _KeyBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KeyBoard */ \"./src/KeyBoard.js\");\n/* harmony import */ var _data_en__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/en */ \"./src/data/en.js\");\n/* harmony import */ var _data_rus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/rus */ \"./src/data/rus.js\");\n\n\n\n\nconst textarea = document.createElement('textarea');\ntextarea.setAttribute('id', 'boardTextarea');\ndocument.body.appendChild(textarea);\ntextarea.focus();\n\nconst board = new _KeyBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([_data_en__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _data_rus__WEBPACK_IMPORTED_MODULE_2__[\"default\"]], textarea, document.body);\nboard.drawBoard();\n\nconst text = '<ul><li>To change lang: click/press CapsLock</li><li>To switch uppercase: double click/press CapsLock</li></ul>';\nconst note = document.createElement('div');\nnote.innerHTML = text;\ndocument.body.appendChild(note);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.css?");

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi ./src/index.js ./src/style.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/style.css */\"./src/style.css\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/style.css?");

/***/ })

/******/ });