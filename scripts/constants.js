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

//массив готовых фото
const initialCards = [
  {
    name: 'Питер',
    link: './images/Zorro/photo_2022-06-13_18-00-43.jpg'
  },
  {
    name: 'Бальные танцы',
    link: './images/Zorro/photo_2022-06-13_18-02-19.jpg'
  },
  {
    name: 'Птичка на ладони',
    link: './images/Zorro/photo_2022-06-13_18-00-11.jpg'
  },
  {
    name: 'Макро',
    link: './images/Zorro/photo_2022-06-13_18-00-05.jpg'
  },
  {
    name: 'Одуванчики',
    link: './images/Zorro/photo_2022-06-13_17-59-20.jpg'
  },
  {
    name: 'Пёсик',
    link: './images/Zorro/photo_2022-06-13_17-59-45.jpg'
  },
];

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
const expandPicImage = popupExpandPic.querySelector(selectors.fullSizeImg);
// ищем название фото попапа просмотра
const expandPicName = popupExpandPic.querySelector(selectors.fullSizeImgCaption);

// Создадим объект параметров
const validationConfig = {
  form: '.form',
  formInput: '.form__input',
  formSubmit: '.form__submit',
  formSet: '.form__set',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

export {selectors, classAddRemove, initialCards, popupEditProfile, popupEditProfileButton, popupCloseButton, formEditProfileSubmit, nameInput, jobInput, profileName,
  profileJob, popupAddCard, popupAddCardButton, popupCloseAddCardButton, formAddCardSubmit, cardsList, cardTemplate, cardNameInput, cardLinkInput,
  popupExpandPic, popupCloseExpandPicButton, expandPicImage, expandPicName, validationConfig};
