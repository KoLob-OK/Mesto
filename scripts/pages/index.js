import {initialCards} from '../utils/initialCards.js';

import {
  validationConfig,
  popupEditProfile,
  popupEditProfileButton,
  popupCloseButton,
  formEditProfileSubmit,
  popupAddCard,
  popupAddCardButton,
  popupCloseAddCardButton,
  formAddCardSubmit,
  cardsList,
  popupExpandPic
} from '../utils/constants.js';

import {
  openPopup,
  closePopup,
  closePopupByClickOnOverlay,
  createCard,
  openEditProfilePopup,
  handleEditFormSubmit,
  openAddCardPopup,
  handleAddFormSubmit
} from '../utils/utils.js';

import Section from '../components/Section.js';

import FormValidator from '../components/FormValidator.js';

/*---------------------------------------------------------------------------------------*/
// слушатели событий по клику вне попапов
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAddCard.addEventListener('click', closePopupByClickOnOverlay);
popupExpandPic.addEventListener('click', closePopupByClickOnOverlay);
/*---------------------------------------------------------------------------------------*/
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
