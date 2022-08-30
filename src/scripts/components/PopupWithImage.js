import Popup from "./Popup.js";

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

// создаем класс PopupWithImage, родителем которого является класс Popup
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // наследуем селектор класса из родителя
    super(popupSelector);
    // задаем переменные, которые берем из поиска селекторов окна просмотра фото
    this._popupImage = this._popup.querySelector(selectors.fullSizeImg);
    this._popupCaption = this._popup.querySelector(selectors.fullSizeImgCaption);
  }

  // модифицируем метод родителя open()
  open(name, link){
    // дополняем метод родителя присваиванием значений для описания, ссылки и alt
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;
    // используем метод родителя open()
    super.open();
  }
}
