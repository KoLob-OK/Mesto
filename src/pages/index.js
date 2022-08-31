import './index.css';

import {initialCards} from '../utils/initialCards.js';

import {
  selectors,
  validationConfig,
  popupEditProfileButton,
  formEditProfileSubmit,
  popupAddCardButton,
  formAddCardSubmit,
  nameInput,
  jobInput
} from '../utils/constants.js';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";


/*++++++++++++++++Валидация+++++++++++++++++++++*/

// создаем экземпляр класса FormValidator для формы редактирования профиля
const formEditProfileVal = new FormValidator(validationConfig, formEditProfileSubmit);
formEditProfileVal.enableValidation();
// создаем экземпляр класса FormValidator для формы добавления карточки
const formAddCardVal = new FormValidator(validationConfig, formAddCardSubmit);
formAddCardVal.enableValidation();

/*----------------Валидация---------------------*/


/*+++++++++++++++++++++++Работа с карточками++++++++++++++++++++++++*/

// создаем экземпляр класса Section для отображения карточек на странице
const initialCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialCardsList.addItem(createCard(item));
  },
}, '.elements__list');

// функция создания элемента карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      popupExpandPic.open(name, link);
    }
  }, selectors);
  const cardElement = card.generateCard();

  return cardElement;
};

// создаем экземпляр класса просмотра фото
const popupExpandPic = new PopupWithImage(selectors.popupExpandPic, selectors);
// слушаем события
popupExpandPic.setEventListeners();

// создаем экземпляр класса попапа с формой добавления новой карточки
const popupAddCard = new PopupWithForm({
  popupSelector: selectors.popupAddCard,
  handleFormSubmit: (formData) => {
    initialCardsList.addItem(createCard(formData));
    popupAddCard.close();
  }
}, selectors, validationConfig);

// устанавливаем слушатели для формы
popupAddCard.setEventListeners();

// Обработчик кнопки добавления карточки
popupAddCardButton.addEventListener('click', () => {
  // Вызовем resetValidation для формы, чтобы сбросить валидацию
  formAddCardVal.resetValidation();
  popupAddCard.open();
});

// рендерим массив карточек на страницу
initialCardsList.renderItems();

/*-----------------------Работа с карточками------------------------*/


/*++++++++++++++++++++++++Работа с профилем+++++++++++++++++++++++++*/

// создаем экземпляр класса UserInfo для получения данных пользователя, который будем использовать в форме попапа редактирования профиля
const userInfo = new UserInfo({
  username: selectors.userName,
  job: selectors.userJob
});

// создаем экземпляр класса попапа с формой редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: selectors.popupEditProfile,
  handleFormSubmit: (userdata) => {
    userInfo.setUserInfo({
      username: userdata.username,
      job: userdata.job
    });
    popupEditProfile.close();
  }
}, selectors, validationConfig);

// устанавливаем слушатели для формы
popupEditProfile.setEventListeners();

// Обработчик кнопки Edit попапа редактирования профиля
popupEditProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.username;
  jobInput.value = info.job;
  formEditProfileVal.resetValidation();
  popupEditProfile.open();
});

/*------------------------Работа с профилем-------------------------*/





