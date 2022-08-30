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

export default class Popup {
  constructor(popupSelector) {
    // ищем селектор попапа и присваиваем его this
    this._popup = document.querySelector(popupSelector);
    // ищем кнопку закрытия попапа (крестик) и присваиваем её this
    this._buttonClose = this._popup.querySelector(selectors.buttonClose);
    // применяем метод закрытия окна попапа по нажатию на Escape, включая метод bind для исключения потери контекста this
    this._escapeClose = this._handleEscClose.bind(this);
  }

  // метод открытия попапа
  open() {
    // добавляем попапу класс 'popup_opened' для его видимости
    this._popup.classList.add(classAddRemove.popupOpenClose);
    // слушаем нажатие клавиши Escape
    document.addEventListener('keydown', this._escapeClose);
  }

  // метод закрытия попапа
  close() {
    // удаляем у попапа класс 'popup_opened' для его скрытия
    this._popup.classList.remove(classAddRemove.popupOpenClose);
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
    this._popup.addEventListener('click', this._handleClickOnOverlayClose.bind(this));
  }
}
