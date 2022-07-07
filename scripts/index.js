//массив готовых фото
const initialCards = [
  {
    name: 'Ресторан "Борщ"',
    link: 'https://downloader.disk.yandex.ru/preview/3a330064b6a4adaa5ae9f4331b271b30e18ad53df1c3c8caba367ddc809cd6e2/62c6a6d5/7TuFZINFR3stYN3AVxaWB_BYXmPS7R1a3ygpfR6uK3Sovy46qWwPRlssDBERTRq5uPRiQ-YtSlNmJNpSbYa_tA%3D%3D?uid=0&filename=AZH_3056%D0%B8%D1%8E%D0%BD%2022%202022.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1900x902'
  },
  {
    name: 'Пирамида',
    link: 'https://downloader.disk.yandex.ru/preview/1a3953ae565a5280e532793c9abb8effaaeef21625f45cc08efe05e0c0c63cec/62c6a6d5/05CdXPWfmfHBMTm4WUcjYAgeFpf2H2YL5BC_hZY1brcnzwMv7hEOtA0veJB_7ao0uSWnXD4PG0S9G0vJgen22Q%3D%3D?uid=0&filename=AZH_2946%D0%B8%D1%8E%D0%BD%2022%202022.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1900x902'
  },
  {
    name: 'г.Пушкин. Мечеть',
    link: 'https://downloader.disk.yandex.ru/preview/b713e28f24b9bf371f1e90a873e4aa512b2cbbb64abd71a73534ac8efbc24348/62c6a6d5/4-IssEo25Cn63W7EDOlXJuJYYrsxrQI55bHmtj-1q3MhNDps0B0cHeJfniG18X7JY3elRJWjKkrq21rolAgoEw%3D%3D?uid=0&filename=AZH_2948%D0%B8%D1%8E%D0%BD%2022%202022.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1900x902'
  },
  {
    name: 'Старый мост',
    link: 'https://downloader.disk.yandex.ru/preview/8f60941597c7bfc6f0e7bfc1f9056e7fc843fcc3692af31d30f4adbd49bb51dd/62c6a6d5/VynnzkwDQpaTAt-MZrJbp5tkW8Y6moZmVHCPVnNGt0gcQbbsror5Gp6axoVS8Y3nDSqs9N4vDMsohsX_taSkCw%3D%3D?uid=0&filename=AZH_2938%D0%B8%D1%8E%D0%BD%2022%202022.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1900x902'
  },
  {
    name: 'Царские клумбы',
    link: 'https://downloader.disk.yandex.ru/preview/b002697743cf06b1d08af651c271388f9077304a58fa30e4b42a8529a184800f/62c6a6d5/FPobNoM5y6UW9BwbIH7w5uHbjJvlHhOoOkLq3h4mNGUluYyIJAlfjRMHqVtIaZQt5JLoqAiIk_PIyba_dN5bUQ%3D%3D?uid=0&filename=AZH_3026%D0%B8%D1%8E%D0%BD%2022%202022.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1900x902'
  },
  {
    name: 'Белка',
    link: 'https://downloader.disk.yandex.ru/preview/524ab43df2d5c90231c367673e0cd1eaadf11e803ecf81a395e9b91c1651c9b3/62c6a6d5/8ntAir86_1vcrsXpPT-gaZVMKuW7jNEw6sQA381AQDxQDTASn2VeUaxAyIO1gn6wVp3jyAwRZaLJSrcFArpvIw%3D%3D?uid=0&filename=AZH_2986%D0%B8%D1%8E%D0%BD%2022%202022.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1900x902'
  }
];

// ищем попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
// ищем кнопку для открытия попапа редактирования профиля
const popupEditProfileButton = document.querySelector('.profile__edit-button');
// ищем кнопку закрытия попапа редактирования профиля
const popupCloseButton = popupEditProfile.querySelector('.popup__close');
// ищем форму попапа редактирования профиля
const formEditProfileSubmit = popupEditProfile.querySelector('.popup__form');
// ищем инпуты (переменные) формы попапа редактирования профиля
let nameInput = popupEditProfile.querySelector('.form__input_type_username');
let jobInput = popupEditProfile.querySelector('.form__input_type_job');
// задаем переменные, в которые будут сохраняться данные из формы
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');

// ищем попап добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
// ищем кнопку открытия попапа добавления карточки
const popupAddCardButton = document.querySelector('.profile__add-button');
// ищем кнопку для закрытия попапа добавления карточки
const popupCloseAddCardButton = popupAddCard.querySelector('.popup__close');
// ищем кнопку "Создать" попапа добавления карточки
const formAddCardSubmit = popupAddCard.querySelector('.popup__form');

// // ищем форму попапа добавления карточки
// const formAddCard = popupAddCard.querySelector('.');
// ищем контейнер, в который будем вставлять карточки
const cardsList = document.querySelector('.elements__list');
// ищем шаблон карточки
const cardTemplate = document.querySelector('.element-tmp').content;
// ищем инпут названия карточки
let cardNameInput = formAddCardSubmit.querySelector('.form__input_type_name');
// ищем инпут ссылки на картинку карточки
let cardLinkInput = formAddCardSubmit.querySelector('.form__input_type_link');


// функция добавления карточки
const addCard = (nameValue, imgValue) => {
  // ищем элемент карточки, который создавать
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  // ищем картинку
  const cardImg = cardElement.querySelector('.element__image');
  // ищем название картинки
  const cardName = cardElement.querySelector('.element__title');
  // ищем кнопку лайка карточки
  const cardLikeButton = cardElement.querySelector('.element__like-button');
  // ищем кнопку удаления карточки
  const cardDeleteButton = cardElement.querySelector('.element__del-button');

  //задаем соответствия аргументам функции
  cardName.textContent = nameValue;
  cardImg.src = imgValue;
  cardImg.alt = nameValue;
  // вставляем элемент в начало списка
  cardsList.prepend(cardElement);

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

};
// функция загрузки карточек из массива
const addCardsFromArray = function (array) {
  array.map(function(card) {
    return addCard(card.name, card.link);
  });
};
// вызываем функцию добавления карточек из массива с аргументом нашего массива
addCardsFromArray(initialCards);

//Edit-Profile (работа с попапом)
// функция закрытия попапа
const closePopup = function (close) {
  close.classList.remove('popup_opened');
}
// функция открытия/закрытия попапа
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
};


// функция закрытия попапа по клику вне окна
const closePopupByClickOnOverlay = function (e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopup(popupEditProfile);
  closePopup(popupAddCard);
}
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAddCard.addEventListener('click', closePopupByClickOnOverlay);


// функция, выполняемая по нажатию кнопки редактирования профиля
const openEditProfilePopup = function () {
  togglePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// функция закрывания попапа редактирования профиля
const closeEditProfilePopup = function () {
  togglePopup(popupEditProfile);
};
// функция отправки данных редактирования профиля
const editFormSubmitHandler = function (evt) {
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
const openAddCardPopup = function () {
  togglePopup(popupAddCard);
}
// функция закрывания попапа добавления карточки
const closeAddCardPopup = function () {
  togglePopup(popupAddCard);
};
// функция отправки данных добавленой карточки
const addFormSubmitHandler = function (evt) {
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
