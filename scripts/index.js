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
  card: '.element',
  cardImg: '.element__image',
  cardName: '.element__title',
  cardTemplate: '.element-tmp',
  fullSizeImg: '.popup__image',
  fullSizeImgCaption: '.popup__caption'
};

//массив готовых фото
const initialCards = [
  {
    name: 'Питер',
    link: '../images/Zorro/photo_2022-06-13_18-00-43.jpg'
  },
  {
    name: 'Бальные танцы',
    link: '../images/Zorro/photo_2022-06-13_18-02-19.jpg'
  },
  {
    name: 'Птичка на ладони',
    link: '../images/Zorro/photo_2022-06-13_18-00-11.jpg'
  },
  {
    name: 'Макро',
    link: '../images/Zorro/photo_2022-06-13_18-00-05.jpg'
  },
  {
    name: 'Одуванчики',
    link: '../images/Zorro/photo_2022-06-13_17-59-20.jpg'
  },
  {
    name: 'Пёсик',
    link: '../images/Zorro/photo_2022-06-13_17-59-45.jpg'
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
let nameInput = popupEditProfile.querySelector(selectors.inputUsername);
let jobInput = popupEditProfile.querySelector(selectors.inputJob);
// задаем переменные, в которые будут сохраняться данные из формы
let profileName = document.querySelector(selectors.userName);
let profileJob = document.querySelector(selectors.userJob);

// ищем попап добавления карточки
const popupAddCard = document.querySelector(selectors.popupAddCard);
// ищем кнопку открытия попапа добавления карточки
const popupAddCardButton = document.querySelector(selectors.buttonAdd);
// ищем кнопку для закрытия попапа добавления карточки
const popupCloseAddCardButton = popupAddCard.querySelector(selectors.buttonClose);
// ищем кнопку "Создать" попапа добавления карточки
const formAddCardSubmit = popupAddCard.querySelector(selectors.form);

// // ищем форму попапа добавления карточки
// const formAddCard = popupAddCard.querySelector('.');
// ищем контейнер, в который будем вставлять карточки
const cardsList = document.querySelector(selectors.cardsList);
// ищем шаблон карточки
const cardTemplate = document.querySelector(selectors.cardTemplate).content;
// ищем инпут названия карточки
let cardNameInput = formAddCardSubmit.querySelector(selectors.inputImgName);
// ищем инпут ссылки на картинку карточки
let cardLinkInput = formAddCardSubmit.querySelector(selectors.inputImgLink);
// ищем попап просмотра фото
const popupExpandPic = document.querySelector(selectors.popupExpandPic);
// ищем кнопку закрытия просмотра фото
const popupCloseExpandPicButton = popupExpandPic.querySelector(selectors.buttonClose);



// функция добавления карточки
const addCard = (nameValue, imgValue) => {
  // ищем элемент карточки, который создавать
  const cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true);
  // ищем картинку
  const cardImg = cardElement.querySelector(selectors.cardImg);
  // ищем название картинки
  const cardName = cardElement.querySelector(selectors.cardName);
  // ищем кнопку лайка карточки
  const cardLikeButton = cardElement.querySelector(selectors.buttonLike);
  // ищем кнопку удаления карточки
  const cardDeleteButton = cardElement.querySelector(selectors.buttonDel);
  // ищем фото попапа просмотра
  const expandPicImage = popupExpandPic.querySelector(selectors.fullSizeImg);
  // ищем название фото попапа просмотра
  const expandPicName = popupExpandPic.querySelector(selectors.fullSizeImgCaption);

  // задаем соответствия аргументам функции
  cardName.textContent = nameValue;
  cardImg.src = imgValue;
  cardImg.alt = nameValue;
  // вставляем элемент перед концом
  cardsList.prepend(cardElement);

  /*---------------------------------------------------------------------------------------*/
  //Full Size (работа с попапом)
  // функция открытия попапа просмотра фото
  const openExpandPicPopup = () => {
    togglePopup(popupExpandPic);
    // задаем начальные атрибуты (ссылка, название, alt) для попапа просмотра изображения
    expandPicImage.src = cardImg.src;
    expandPicName.textContent = cardName.textContent;
    expandPicImage.alt = cardName.textContent;
  };

  // функция закрывания попапа просмотра фото
  const closeExpandPicPopup = () => {
    popupExpandPic.classList.remove('popup_opened');
  };

  // слушаем нажатие на картинку карточки
  cardImg.addEventListener('click', openExpandPicPopup);
  // слушаем кнопку закрытия попапа просмотра фото
  popupCloseExpandPicButton.addEventListener('click', closeExpandPicPopup);

  //Likes
  // функция добавления класса (модификатора) кнопке лайк
  const toggleLike = () => {
    cardLikeButton.classList.toggle('element__like-button_active');
  };
  // слушаем кнопку лайк
  cardLikeButton.addEventListener('click', toggleLike);

  //Delete
  // функция удаления карточки
  const cardRemove = () => {
    cardElement.remove();
  };
  // слушаем кнопку корзины
  cardDeleteButton.addEventListener('click', cardRemove);
//конец функции addCard
};
// функция загрузки карточек из массива
const addCardsFromArray = (array) => {
  array.map((card) => {
    return addCard(card.name, card.link);
  });
};
// вызываем функцию добавления карточек из массива с аргументом нашего массива
addCardsFromArray(initialCards);

/*---------------------------------------------------------------------------------------*/
// функция закрытия попапа
const closePopup = (close) => {
  close.classList.remove('popup_opened');
}

// функция открытия/закрытия попапа
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
};

// функция закрытия попапа по клику вне окна попапа
const closePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopup(popupEditProfile);
  closePopup(popupAddCard);
  closePopup(popupExpandPic);
};
// слушатели событий по клику вне попапов
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAddCard.addEventListener('click', closePopupByClickOnOverlay);
popupExpandPic.addEventListener('click', closePopupByClickOnOverlay);

/*---------------------------------------------------------------------------------------*/
//Edit-Profile (работа с попапом)
// функция, выполняемая по нажатию кнопки редактирования профиля
const openEditProfilePopup = () => {
  togglePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// функция закрывания попапа редактирования профиля
const closeEditProfilePopup = () => {
  togglePopup(popupEditProfile);
};
// функция отправки данных редактирования профиля
const editFormSubmitHandler = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  evt.stopPropagation(); //отменяет всплытие события
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}
// слушаем кнопку редактирования профиля пользователя
popupEditProfileButton.addEventListener('click', openEditProfilePopup);
// слушаем кнопку закрытия попапа редактирования профиля пользователя
popupCloseButton.addEventListener('click', closeEditProfilePopup);
// Submit формы данных пользователя
formEditProfileSubmit.addEventListener('submit', editFormSubmitHandler);

/*---------------------------------------------------------------------------------------*/
//Add-Card (работа с попапом)
// функция, выполняемая по нажатию кнопки добавления карточки
const openAddCardPopup = () => {
  togglePopup(popupAddCard);
}
// функция закрывания попапа добавления карточки
const closeAddCardPopup = () => {
  togglePopup(popupAddCard);
};
// функция отправки данных добавленой карточки
const addFormSubmitHandler = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  evt.stopPropagation(); //отменяет всплытие события
  const name = cardNameInput;
  const img = cardLinkInput;
  // вызываем функцию addCard с параметрами значений
  addCard(name.value, img.value);
  // обнуляем поля формы
  name.value = "";
  img.value = "";
  togglePopup(popupAddCard);
}
// слушаем кнопку добавления карточки
popupAddCardButton.addEventListener('click', openAddCardPopup);
// слушаем кнопку закрытия попапа добавления карточки
popupCloseAddCardButton.addEventListener('click', closeAddCardPopup);
// Submit формы карточки
formAddCardSubmit.addEventListener('submit', addFormSubmitHandler);
