import Popup from "./Popup.js";

// создаем класс PopupWithForm, родителем которого является класс Popup
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, selectors, validationConfig) {
    // наследуем селектор класса из родителя
    super(popupSelector, selectors);
    // задаем колбэк сабмита формы
    this._handleFormSubmit = handleFormSubmit;
    // задаем переменные - ищем форму, кладем в переменную popupForm
    this._popupForm = this._popup.querySelector(validationConfig.form);
    // задаем переменные - ищем все инпуты формы, кладем их в переменную inputList
    this._inputList = this._popupForm.querySelectorAll(validationConfig.formInput);
    // задаем кнопку сабмита формы
    this._submitButton = this._popupForm.querySelector(validationConfig.formSubmit);
    // задаем кнопке сабмита текст
    this._submitButtonText = this._submitButton.textContent;
  }

  // метод собирает данные всех полей формы
  _getInputValues() {
    // задаем пустой объект для данных
    this._formValues = {};
    // проходимся по массиву
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    // возврашаем объект с данными
    return this._formValues;
  }

  // перезаписываем родительский метод слушателей событий
  setEventListeners() {
    // используем метод родителя setEventListeners()
    super.setEventListeners();
    // дополняем слушателем сабмита формы
    this._popupForm.addEventListener('submit', (evt) => {
      // отменяем дефолтную отправку данных
      evt.preventDefault();
      // применяем метод _handleFormSubmit с аргументом
      // в виде метода сбора данных всех полей формы
      this._handleFormSubmit(this._getInputValues());
    })
  }

  // перезаписываем родительский метод close()
  close() {
    // используем метод родителя close()
    super.close();
    // сбрасываем поля формы
    this._popupForm.reset();
  }

  // метод измения кнопки при загрузке данных
  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
      console.log('Загрузка данных');
    } else {
      this._submitButton.textContent = this._submitButtonText;
      console.log('Загрузка завершена');
    }
  }
}
