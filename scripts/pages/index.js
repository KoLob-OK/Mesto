import {initialCards} from '../utils/initialCards.js';

import {selectors, classAddRemove, validationConfig, popupEditProfile, popupEditProfileButton, popupCloseButton, formEditProfileSubmit, nameInput, jobInput, profileName,
  profileJob, popupAddCard, popupAddCardButton, popupCloseAddCardButton, formAddCardSubmit, cardsList, cardNameInput, cardLinkInput,
  popupExpandPic} from '../utils/constants.js';

import Card from '../components/Card.js';

import Section from '../components/Section.js';

import FormValidator from '../components/FormValidator.js';

function createCard(name, link) {
  const card = new Card(name, link, selectors.cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция добавления карточек
const addCard = (name, link) => {
  cardsList.prepend(createCard(name, link));
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

// создаем экземпляр класса FormValidator для формы редактирования профиля
const formEditProfileVal = new FormValidator(validationConfig, formEditProfileSubmit);
formEditProfileVal.enableValidation();

// создаем экземпляр класса FormValidator для формы добавления карточки
const formAddCardVal = new FormValidator(validationConfig, formAddCardSubmit);
formAddCardVal.enableValidation();

// создаем экземпляр класса Section для отображения карточек на странице
const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialCardsList.addItem(createCard(item.name, item.link));
  },
}, cardsList);

// рендерим массив карточек на страницу
initialCardsList.renderItems();

export {openPopup, closePopup};
