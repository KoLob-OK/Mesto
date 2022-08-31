import Popup from "./Popup.js";

// создаем класс PopupWithImage, родителем которого является класс Popup
export default class PopupWithImage extends Popup {
  constructor(popupSelector, selectors) {
    // наследуем селектор класса из родителя
    super(popupSelector, selectors);
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
