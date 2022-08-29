import '../../pages/index.css';

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

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

// создаем экземпляр класса FormValidator для формы редактирования профиля
const formEditProfileVal = new FormValidator(validationConfig, formEditProfileSubmit);

// создаем экземпляр класса FormValidator для формы добавления карточки
const formAddCardVal = new FormValidator(validationConfig, formAddCardSubmit);


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
  }, selectors.cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
};

// создаем экземпляр класса просмотра фото
const popupExpandPic = new PopupWithImage(selectors.popupExpandPic);
// слушаем события
popupExpandPic.setEventListeners();

// создаем экземпляр класса попапа с формой добавления новой карточки
const popupAddCard = new PopupWithForm({
  popupSelector: selectors.popupAddCard,
  handleFormSubmit: (formData) => {
    initialCardsList.addItem(createCard(formData));
    popupAddCard.close();
  }
});
// устанавливаем слушатели для формы
popupAddCard.setEventListeners();
// Обработчик кнопки добавления карточки
popupAddCardButton.addEventListener('click', () => {
  formAddCardVal.enableValidation();
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
});

// устанавливаем слушатели для формы
popupEditProfile.setEventListeners();

// Обработчик кнопки Edit попапа редактирования профиля
popupEditProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.username;
  jobInput.value = info.job;
  formEditProfileVal.enableValidation();
  popupEditProfile.open();
});
/*------------------------Работа с профилем-------------------------*/




