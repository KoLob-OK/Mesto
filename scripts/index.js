import {selectors, classAddRemove, initialCards, popupEditProfile, popupEditProfileButton, popupCloseButton, formEditProfileSubmit, nameInput, jobInput, profileName,
  profileJob, popupAddCard, popupAddCardButton, popupCloseAddCardButton, formAddCardSubmit, cardsList, cardNameInput, cardLinkInput,
  popupExpandPic, validationConfig} from './constants.js';

import {Card} from './Card.js';


// Функция добавления карточек из массива
const addCardsFromArray = (array) => {
    array.forEach((card) => {
    const imgData = new Card (card.name, card.link, selectors.cardTemplate);
    const cardElement = imgData.generateCard();

  // вставляем элемент перед концом
  cardsList.prepend(cardElement);
  })
};

// Функция добавления новых карточек их формы попапа
const addCardFromForm = (name, link) => {
  const card = new Card(name, link, selectors.cardTemplate).generateCard();
  cardsList.prepend(card);
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
  addCardFromForm(cardNameInput.value, cardLinkInput.value);
  cardNameInput.value = '';
  cardLinkInput.value = '';
  closePopup(popupAddCard);
  // обнуляем поля формы
  formAddCardSubmit.reset();
  // отключаем кнопку
  const disButton = formAddCardSubmit.querySelector(validationConfig.formSubmit);
  disButton.setAttribute('disabled', 'disabled');
}

// вызываем функцию добавления карточек из массива с аргументом нашего массива
addCardsFromArray(initialCards);

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

export {openPopup, closePopup}
