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
// ищем кнопку "Создать" попапа добавления карточки
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

//Likes
// функция добавления класса (модификатора) кнопке лайк
const toggleLike = (e) => {
  e.target.classList.toggle('element__like-button_active');
};

//Delete
// функция удаления карточки
const cardRemove = (e) => {
  e.target.closest(selectors.card).remove();
};

//Full Size (работа с попапом)
// функция открытия попапа просмотра фото
const openExpandPicPopup = (e) => {
  // задаем начальные атрибуты (ссылка, название, alt) для попапа просмотра изображения
  expandPicImage.src = e.target.src;
  expandPicName.textContent = e.target.alt;
  expandPicImage.alt = e.target.alt;
  openPopup(popupExpandPic);
};
// слушаем кнопку закрытия попапа просмотра фото
popupCloseExpandPicButton.addEventListener('click', () => closePopup(popupExpandPic));


const createCard = (nameValue, imgValue) => {
  // ищем элемент карточки, который создавать
  const cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true);

  // ищем картинку
  const cardImg = cardElement.querySelector(selectors.cardImg);
  // задаем соответствия аргументам
  cardImg.src = imgValue;
  cardImg.alt = nameValue;
  // слушаем нажатие на картинку карточки
  cardImg.addEventListener('click', openExpandPicPopup);

  // ищем название картинки
  const cardName = cardElement.querySelector(selectors.cardName);
  cardName.textContent = nameValue;

  // ищем кнопку лайка карточки
  const cardLikeButton = cardElement.querySelector(selectors.buttonLike);
  // слушаем кнопку лайк
  cardLikeButton.addEventListener('click', toggleLike);

  // ищем кнопку удаления карточки
  const cardDeleteButton = cardElement.querySelector(selectors.buttonDel);
  // слушаем кнопку корзины
  cardDeleteButton.addEventListener('click', cardRemove);

  return cardElement;
}

const addCardsFromArray = (array) => {
  const newList = [];
  array.reverse().forEach((card) => {
    const newCard = createCard(card.name, card.link);
    newList.push(newCard);
  });
  // вставляем элемент перед концом с разбиванием массива оператором spread на аргументы функции
  cardsList.prepend(...newList);
};

// вызываем функцию добавления карточек из массива с аргументом нашего массива
addCardsFromArray(initialCards);

/*---------------------------------------------------------------------------------------*/
// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

// функция открытия/закрытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
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
  if (e.key = 'Escape')
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
  evt.stopPropagation(); //отменяет всплытие события
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
// слушаем кнопку редактирования профиля пользователя
popupEditProfileButton.addEventListener('click', openEditProfilePopup);
// слушаем кнопку закрытия попапа редактирования профиля пользователя
popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
// Submit формы данных пользователя
formEditProfileSubmit.addEventListener('submit', handleEditFormSubmit);

/*---------------------------------------------------------------------------------------*/
//Add-Card (работа с попапом)
// функция, выполняемая по нажатию кнопки добавления карточки
const openAddCardPopup = () => {
  openPopup(popupAddCard);
}

// функция отправки данных добавленой карточки
const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  evt.stopPropagation(); //отменяет всплытие события
  const name = cardNameInput;
  const link = cardLinkInput;
  const addNewCardValue = createCard(name.value, link.value);
  // добавляем в начало галереи
  cardsList.prepend(addNewCardValue);
  closePopup(popupAddCard);
  // обнуляем поля формы
  formAddCardSubmit.reset();
}
// слушаем кнопку добавления карточки
popupAddCardButton.addEventListener('click', openAddCardPopup);
// слушаем кнопку закрытия попапа добавления карточки
popupCloseAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
// Submit формы карточки
formAddCardSubmit.addEventListener('submit', handleAddFormSubmit);


