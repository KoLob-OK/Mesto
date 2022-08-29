import Popup from "./Popup.js";
import {selectors} from "../utils/constants.js";

// создаем класс PopupWithImage, родителем которого является класс Popup
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // наследуем селектор класса из родителя
    super(popupSelector);
    // задаем переменные, которые берем из поиска селекторов окна просмотра фото
    this._popupImage = this._popupSelector.querySelector(selectors.fullSizeImg);
    this._popupCaption = this._popupSelector.querySelector(selectors.fullSizeImgCaption);
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
