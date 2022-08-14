import {validationConfig} from './constants.js';

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции на основе уникального класса
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Добавляем класс нижней красной границы
  inputElement.classList.add(validationConfig.inputError);
  // Заполняем текстовое содержимое элемента ошибки
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(validationConfig.inputErrorActive);
};


// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Скрываем нижнюю красную границу
  inputElement.classList.remove(validationConfig.inputError);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(validationConfig.inputErrorActive);
  // Очищаем поле элемента ошибки
  errorElement.textContent = '';
};


// Функция возвращает или убирает текст ошибки в зависимости от валидности поля ввода
const checkInputValidity = (formElement, inputElement) => {
  // При условии, если поле ввода не валидно
  if (!inputElement.validity.valid) {
    // выполнить функцию показа ошибки
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // иначе выполнить функцию скрытия ошибки
    hideInputError(formElement, inputElement);
  }
};


// Функция проверяет валидность поля ввода
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится
    // и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};


// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
  }
};





// Функция примет параметром элемент формы и добавит её полям нужные обработчики
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.formInput));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(validationConfig.formSubmit);

  // Вызовем toggleButtonState, чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученного массива
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};


// Функция находит все формы на странице и обрабатывает их
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(validationConfig.form));
  // Обойдём все элементы полученного массива
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Найдём все независимые филдсеты с указанным классом в DOM, сделаем из них массив
    const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.formSet));
    // Перебираем элементы массива филдсетов
    fieldsetList.forEach((fieldSet) => {
      // Для каждого элемента массива филдсетов вызываем функцию слушателя событий
      setEventListeners(fieldSet);
    });
  });
};

enableValidation(validationConfig);
