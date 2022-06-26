/* Создание переменной открывания попапа редактирования профиля пользователя */
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

/* Создание переменной элемента "попап" для выбора в дальнейшем только в этой группе */
const popupElement = document.querySelector('.popup');

/* Создание переменной закрывания попапа кнопкой крестика */
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

/* Создание переменной имени пользователя в попапе*/
let nameInput = popupElement.querySelector('input[name="username"]');

/* Создание переменной Job пользователя в попапе*/
let jobInput = popupElement.querySelector('input[name="job"]');

/* Создание переменной кнопки "Сохранить"*/
const formSubmit = popupElement.querySelector('.popup__form');


let profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__title');
const profileJob = profileElement.querySelector('.profile__description');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
}

popupOpenButtonElement.addEventListener('click', function () {
  openPopup();
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
});

popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay)

const formSubmitHandler = function () {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formSubmit.addEventListener('submit', function () {
  formSubmitHandler();
  closePopup();
});
