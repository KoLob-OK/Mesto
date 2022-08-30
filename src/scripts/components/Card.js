const selectors = {
  popupEditProfile: '.popup_type_profile-edit',
  popupAddCard: '.popup_type_add-card',
  popupExpandPic: '.popup_type_expand-image',
  inputUsername: '.form__input_type_username',
  inputJob: '.form__input_type_job',
  inputImgName: '.form__input_type_name',
  inputImgLink: '.form__input_type_link',
  userName: '.profile__title',
  userJob: '.profile__description',
  buttonEdit: '.profile__edit-button',
  buttonAdd: '.profile__add-button',
  buttonClose: '.popup__close',
  buttonLike: '.element__like-button',
  buttonDel: '.element__del-button',
  form: '.popup__form',
  cardsList: '.elements__list',
  cardElement: '.element',
  cardImg: '.element__image',
  cardName: '.element__title',
  cardTemplate: '.element-tmp',
  fullSizeImg: '.popup__image',
  fullSizeImgCaption: '.popup__caption',
  popup: '.popup_opened'
};

const classAddRemove = {
  like: 'element__like-button_active',
  popupOpenClose: 'popup_opened'
};


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
    this._cardLikeButton.classList.toggle(classAddRemove.like);
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
    // находим фото
    this._cardImg = this._element.querySelector(selectors.cardImg);
    // находим кнопку лайка
    this._cardLikeButton = this._element.querySelector(selectors.buttonLike);
    // устанавливаем слушатели для карточки
    this._setEventListeners();

    // задаем значения (название, ссылка, alt)
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._element.querySelector(selectors.cardName).textContent = this._name;

    // возвращаем готовый элемент карточки
    return this._element;
  }
}
