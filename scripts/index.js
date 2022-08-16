import {initialCards} from "./initialCards.js";

import Card from './Card.js';

import FormValidator from './FormValidator.js';

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

// Создадим объект параметров
const validationConfig = {
  form: '.form',
  formInput: '.form__input',
  formSubmit: '.form__submit',
  formSet: '.form__set',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

// ищем попап редактирования профиля
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
// ищем кнопку для открытия попапа редактирования профиля
const popupEditProfileButton = document.querySelector(selectors.buttonEdit);
// ищем кнопку закрытия попапа редактирования профиля
const popupCloseButton = popupEditProfile.querySelector(selectors.buttonClose);
// ищем форму попапа редактирования профиля
const formEditProfileSubmit = popupEditProfile.querySelector(selectors.form);
// ищем инпуты (переменные) формы попапа редактирования профиля
const nameInput = popupEditProfile.querySelector(selectors.inputUsername);
const jobInput = popupEditProfile.querySelector(selectors.inputJob);
// задаем переменные, в которые будут сохраняться данные из формы
const profileName = document.querySelector(selectors.userName);
const profileJob = document.querySelector(selectors.userJob);

// ищем попап добавления карточки
const popupAddCard = document.querySelector(selectors.popupAddCard);
// ищем кнопку открытия попапа добавления карточки
const popupAddCardButton = document.querySelector(selectors.buttonAdd);
// ищем кнопку для закрытия попапа добавления карточки
const popupCloseAddCardButton = popupAddCard.querySelector(selectors.buttonClose);
// ищем форму попапа добавления карточки
const formAddCardSubmit = popupAddCard.querySelector(selectors.form);

// ищем контейнер, в который будем вставлять карточки
const cardsList = document.querySelector(selectors.cardsList);
// ищем шаблон карточки
const cardTemplate = document.querySelector(selectors.cardTemplate).content;
// ищем инпуты (переменные) формы попапа добавления карточки
const cardNameInput = formAddCardSubmit.querySelector(selectors.inputImgName);
const cardLinkInput = formAddCardSubmit.querySelector(selectors.inputImgLink);

// ищем попап просмотра фото
const popupExpandPic = document.querySelector(selectors.popupExpandPic);
// ищем кнопку закрытия просмотра фото
const popupCloseExpandPicButton = popupExpandPic.querySelector(selectors.buttonClose);
// ищем фото попапа просмотра
const popupImage = popupExpandPic.querySelector(selectors.fullSizeImg);
// ищем название фото попапа просмотра
const popupCaption = popupExpandPic.querySelector(selectors.fullSizeImgCaption);

function createCard(name, link) {
  const card = new Card(name, link, selectors.cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция добавления карточек
const addCard = (name, link) => {
  cardsList.prepend(createCard(name, link));
};

// Функция формирования карточек из массива
const renderInitialCards = (array) => {
  array.forEach((card) => {
    addCard(card.name, card.link);
  })
};

/*---------------------------------------------------------------------------------------*/

// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove(classAddRemove.popupOpenClose);
  document.removeEventListener(`keydown`, closePopupByPressEscape);
}

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add(classAddRemove.popupOpenClose);
  document.addEventListener(`keydown`, closePopupByPressEscape);
};

// функция закрытия попапа по клику вне окна попапа
const closePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopup(e.currentTarget);
};
// слушатели событий по клику вне попапов
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAddCard.addEventListener('click', closePopupByClickOnOverlay);
popupExpandPic.addEventListener('click', closePopupByClickOnOverlay);

// функция закрытия попапа по нажатию на Escape
const closePopupByPressEscape = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector(selectors.popup);
    closePopup(openedPopup);
  }
};

  /*---------------------------------------------------------------------------------------*/

//Edit-Profile (работа с попапом)
// функция, выполняемая по нажатию кнопки редактирования профиля
const openEditProfilePopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}
// функция отправки данных редактирования профиля
const handleEditFormSubmit = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

/*---------------------------------------------------------------------------------------*/
//Add-Card (работа с попапом)
// функция, выполняемая по нажатию кнопки добавления карточки
const openAddCardPopup = () => {
  openPopup(popupAddCard);
}

// функция отправки данных добавленной карточки
const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  addCard(cardNameInput.value, cardLinkInput.value);
  closePopup(popupAddCard);
  // обнуляем поля формы
  formAddCardSubmit.reset();
  // отключаем кнопку
  formAddCardVal.toggleButtonState();
}

// вызываем функцию формирования карточек из массива с аргументом нашего массива для добавления на страницу
renderInitialCards(initialCards);

// слушаем кнопку редактирования профиля пользователя
popupEditProfileButton.addEventListener('click', openEditProfilePopup);
// слушаем кнопку закрытия попапа редактирования профиля пользователя
popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
// Submit формы данных пользователя
formEditProfileSubmit.addEventListener('submit', handleEditFormSubmit);

// слушаем кнопку добавления карточки
popupAddCardButton.addEventListener('click', openAddCardPopup);
// слушаем кнопку закрытия попапа добавления карточки
popupCloseAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
// Submit формы карточки
formAddCardSubmit.addEventListener('submit', handleAddFormSubmit);

const formEditProfileVal = new FormValidator(validationConfig, formEditProfileSubmit);
formEditProfileVal.enableValidation();

const formAddCardVal = new FormValidator(validationConfig, formAddCardSubmit);
formAddCardVal.enableValidation();


export {selectors, classAddRemove, initialCards, popupEditProfile, popupEditProfileButton, popupCloseButton, formEditProfileSubmit, nameInput, jobInput, profileName,
  profileJob, popupAddCard, popupAddCardButton, popupCloseAddCardButton, formAddCardSubmit, cardsList, cardTemplate, cardNameInput, cardLinkInput,
  popupExpandPic, popupCloseExpandPicButton, popupImage, popupCaption, openPopup, closePopup};
