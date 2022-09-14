export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.formInput));
    this._buttonElement = this._formElement.querySelector(this._validationConfig.formSubmit);
    this._setEventListeners();
  };

  // метод добавления класса с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции на основе уникального класса
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // Добавляем класс нижней красной границы
    inputElement.classList.add(this._validationConfig.inputError);
    // Заполняем текстовое содержимое элемента ошибки
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._validationConfig.inputErrorActive);
  };

  // метод удаления класса с ошибкой
  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // Скрываем нижнюю красную границу
    inputElement.classList.remove(this._validationConfig.inputError);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._validationConfig.inputErrorActive);
    // Очищаем поле элемента ошибки
    errorElement.textContent = '';
  };

  // метод возвращает или убирает текст ошибки в зависимости от валидности поля ввода
  _checkInputValidity(inputElement) {
    // При условии, если поле ввода не валидно
    if (!inputElement.validity.valid) {
      // выполнить функцию показа ошибки
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // иначе выполнить функцию скрытия ошибки
      this._hideInputError(inputElement);
    }
  };

  // метод проверки на валидность поля ввода
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true, обход массива прекратится
      // и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  // метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.removeAttribute('disabled');
    }
  };


  // метод примет параметром элемент формы и добавит её полям нужные обработчики
  _setEventListeners() {
    // Вызовем toggleButtonState, чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();

    // Обойдём все элементы полученного массива
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState();

      });
    });
  };

  // метод сброса валидации
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  };

  // метод валидации находит все формы на странице и обрабатывает их
  enableValidation() {
    // Для каждого элемента вызываем функцию слушателя событий
    this._setEventListeners();
  };
}
