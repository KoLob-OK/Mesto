export default class Card {
  // создаем объект с двумя ключами (данные и функцией открывания
  // попапа с картинкой при клике на карточку) и селектор карточки
  constructor({ data, handleCardClick, api, userID }, selectors) {
    this._name = data.name;
    this._link = data.link;
    this._userID = userID;
    this._handleCardClick = handleCardClick;
    this._selectors = selectors;
  }

  // метод возвращает элемент карточки
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._selectors.cardTemplate)
      .content
      .querySelector(this._selectors.cardElement)
      .cloneNode(true);

    return this._cardElement;
  }

  // метод - обработчик (колбэк) слушателя клика по кнопке "лайк"
  _handleLikeCard() {
    this._cardLikeButton.classList.toggle(this._selectors.like);
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
    this._element.querySelector(this._selectors.cardImg).addEventListener('click', () => {
      this._handleOpenExpandPicPopup();
    })
    // слушатель клика по кнопке удаления карточки
    this._element.querySelector(this._selectors.buttonDel).addEventListener('click', () => {
      this._handleDeleteCard();
    })
    // слушатель клика по кнопке лайк
    this._element.querySelector(this._selectors.buttonLike).addEventListener('click', () => {
      this._handleLikeCard();
    })
  }

  // метод создания готового элемента карточки
  generateCard() {
    // создаем элемент разметки карточки
    this._element = this._getTemplate();
    // находим фото
    this._cardImg = this._element.querySelector(this._selectors.cardImg);
    // находим кнопку лайка
    this._cardLikeButton = this._element.querySelector(this._selectors.buttonLike);
    // устанавливаем слушатели для карточки
    this._setEventListeners();

    // задаем значения (название, ссылка, alt)
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._element.querySelector(this._selectors.cardName).textContent = this._name;

    // возвращаем готовый элемент карточки
    return this._element;
  }
}
