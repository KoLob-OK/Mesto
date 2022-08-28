import {classAddRemove, selectors} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    // ищем селектор попапа и присваиваем его this
    this._popupSelector = document.querySelector(popupSelector);
    // ищем кнопку закрытия попапа (крестик) и присваиваем её this
    this._buttonClose = this._popupSelector.querySelector(selectors.buttonClose);
    // применяем метод закрытия окна попапа по нажатию на Escape, включая метод bind для исключения потери контекста this
    this._escapeClose = this._handleEscClose.bind(this);
  }

  // метод открытия попапа
  open() {
    // добавляем попапу класс 'popup_opened' для его видимости
    this._popupSelector.classList.add(classAddRemove.popupOpenClose);
    // слушаем нажатие клавиши Escape
    document.addEventListener('keydown', this._escapeClose);
  }

  // метод закрытия попапа
  close() {
    // удаляем у попапа класс 'popup_opened' для его скрытия
    this._popupSelector.classList.remove(classAddRemove.popupOpenClose);
    // удаляем слушателя нажатия клавиши Escape
    document.removeEventListener('keydown', this._escapeClose);
  }

  // метод закрытия попапа по нажатию на Escape
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  // метод закрытия попапа по клику вне окна попапа
  _handleClickOnOverlayClose(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.close();
  }

  // открытый метод слушателей событий
  setEventListeners() {
    // слушаем кнопку закрытия попапа, применяем метод close
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    // слушаем клик по оверлею, колбэк - метод закрытия попапа  по клику вне  окна попапа,
    // включая метод bind для исключения потери контекста this
    this._popupSelector.addEventListener('click', this._handleClickOnOverlayClose.bind(this));
  }
}
