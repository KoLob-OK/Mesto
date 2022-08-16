import {selectors, classAddRemove, popupExpandPic, popupCloseExpandPicButton, popupImage, popupCaption, openPopup, closePopup} from './index.js';


export default class Card {
  constructor(name, link, cardSelector) {
    this._container = document.querySelector(cardSelector);
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(selectors.cardElement)
      .cloneNode(true);

    return cardElement;
  }

  // метод слушателя кнопки "лайк"
  _handleLikeCard() {
    const cardLikeButton = this._element.querySelector(selectors.buttonLike);
    cardLikeButton.classList.toggle(classAddRemove.like);
  }

  // метод слушателя кнопки "удалить"
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // метод слушателя открытия попапа просмотра изображения
  _handleOpenExpandPicPopup() {
    popupImage.src = this._link;
    popupCaption.textContent = this._name;
    popupImage.alt = this._name;
    openPopup(popupExpandPic);
  }

  // метод слушателя закрытия попапа просмотра изображения
  _handleCloseExpandPicPopup() {
    popupImage.src = '';
    popupImage.textContent = '';
    closePopup(popupExpandPic);
  }

  _setEventListeners() {
    // открытие попапа просмотра изображения кликом по изображению
    this._element.querySelector(selectors.cardImg).addEventListener('click', () => {
      this._handleOpenExpandPicPopup();
    })
    // закрытие попапа просмотра изображения кликом на кнопку закрытия
    popupCloseExpandPicButton.addEventListener('click', () => {
      this._handleCloseExpandPicPopup();
    })
    // слушатель кнопки удаления карточки
    this._element.querySelector(selectors.buttonDel).addEventListener('click', () => {
      this._handleDeleteCard();
    })
    // слушатель кнопки лайк
    this._element.querySelector(selectors.buttonLike).addEventListener('click', () => {
      this._handleLikeCard();
    })
  }

  // метод создания готовой карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(selectors.cardImg).src = this._link;
    this._element.querySelector(selectors.cardName).textContent = this._name;

    return this._element;
  }
}
