/* Создание переменной открывания попапа редактирования профиля пользователя */
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

/* Создание переменной элемента "попап" для выбора в дальнейшем только в этой группе */
const popupElement = document.querySelector('.popup');

/* Создание переменной закрывания попапа кнопкой крестика */
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

/* Создание переменной имени пользователя в попапе*/
let nameInput = popupElement.querySelector('.form__input_username');

/* Создание переменной Job пользователя в попапе*/
let jobInput = popupElement.querySelector('.form__input_job');

/* Создание переменной кнопки "Сохранить"*/
const formSubmit = popupElement.querySelector('.popup__form');

let profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__title');
const profileJob = profileElement.querySelector('.profile__description');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

/*const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
}*/

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// popupElement.addEventListener('click', closePopupByClickOnOverlay);

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formSubmit.addEventListener('submit', formSubmitHandler);
