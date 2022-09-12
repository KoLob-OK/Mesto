import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, selectors) {
    super(popupSelector, selectors);
    this._popupForm = this._popup.querySelector(selectors.form);
    this.selectors = selectors;
  }

  // метод принятия удаления карточки
  submitDelCard(deletion) {
    this._handleDelSubmit = deletion;
  }

  // перезаписываем родительский метод слушателей событий
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDelSubmit();
    });
  }
}
