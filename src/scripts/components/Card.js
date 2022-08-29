import {
  selectors,
  classAddRemove
} from '../utils/constants.js';


export default class Card {
  // создаем объект с двумя ключами (данные и функцией открывания
  // попапа с картинкой при клике на карточку) и селектор карточки
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  // метод возвращает элемент карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(selectors.cardElement)
      .cloneNode(true);

    return cardElement;
  }

  // метод - обработчик (колбэк) слушателя клика по кнопке "лайк"
  _handleLikeCard() {
    const cardLikeButton = this._element.querySelector(selectors.buttonLike);
    cardLikeButton.classList.toggle(classAddRemove.like);
  }

  // метод - обработчик (колбэк) слушателя клика по кнопке "удалить"
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // метод - обработчик (колбэк) слушателя клика по изображению
  _handleOpenExpandPicPopup() {
    this._handleCardClick(this._name, this._link);
  }

  // метод слушателей событий
  _setEventListeners() {
    // слушатель клика по изображению
    this._element.querySelector(selectors.cardImg).addEventListener('click', () => {
      this._handleOpenExpandPicPopup();
    })
    // слушатель клика по кнопке удаления карточки
    this._element.querySelector(selectors.buttonDel).addEventListener('click', () => {
      this._handleDeleteCard();
    })
    // слушатель клика по кнопке лайк
    this._element.querySelector(selectors.buttonLike).addEventListener('click', () => {
      this._handleLikeCard();
    })
  }

  // метод создания готового элемента карточки
  generateCard() {
    // создаем элемент разметки карточки
    this._element = this._getTemplate();
    // устанавливаем слушатели для карточки
    this._setEventListeners();

    // задаем значения (название, ссылка, alt)
    this._element.querySelector(selectors.cardImg).src = this._link;
    this._element.querySelector(selectors.cardImg).alt = this._name;
    this._element.querySelector(selectors.cardName).textContent = this._name;

    // возвращаем готовый элемент карточки
    return this._element;
  }
}
