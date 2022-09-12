export default class Card {
  // создаем объект с двумя ключами (данные и функцией открывания
  // попапа с картинкой при клике на карточку) и селектор карточки
  constructor({ data, userID, handleCardClick, handleBasketClick }, selectors) {
    this._name = data.name;
    this._link = data.link;
    this._userID = userID;
    this._cardID = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleBasketClick = handleBasketClick;
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

  // метод удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // метод - обработчик (колбэк) слушателя клика по изображению
  _handleOpenExpandPicPopup() {
    this._handleCardClick(this._name, this._link);
  }

  // метод проверки владельца карточки (карточка не имеет кнопку "удалить")
  _hasDelButton() {
    // если ID пользователя не соответствует ID владельца карточки
    if (this._userID !== this._cardOwnerId) {
      // удаляем корзину у карточки
      this._cardDelButton.remove();
    }
  }

  // метод слушателей событий
  _setEventListeners() {
    // слушатель клика по изображению
    this._cardImg.addEventListener('click', () => {
      this._handleOpenExpandPicPopup();
    })
    // слушатель клика по кнопке удаления карточки
    this._cardDelButton.addEventListener('click', () => {
      this._handleBasketClick(this._cardID);
    })
    // слушатель клика по кнопке лайк
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeCard();
    })
  }

  // метод создания готового элемента карточки
  generateCard() {
    // создаем элемент разметки карточки
    this._element = this._getTemplate();
    // находим фото
    this._cardImg = this._element.querySelector(this._selectors.cardImg);
    // находим кнопку лайка карточки
    this._cardLikeButton = this._element.querySelector(this._selectors.buttonLike);
    // находим кнопку удаления карточки
    this._cardDelButton = this._element.querySelector(this._selectors.buttonDel);

    // задаем значения (название, ссылка, alt)
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._element.querySelector(this._selectors.cardName).textContent = this._name;
    this._hasDelButton();

    // устанавливаем слушатели для карточки
    this._setEventListeners();

    // возвращаем готовый элемент карточки
    return this._element;
  }
}
