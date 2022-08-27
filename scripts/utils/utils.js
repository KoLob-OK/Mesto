import {
  cardLinkInput,
  cardNameInput,
  cardsList,
  classAddRemove, formAddCardSubmit,
  jobInput,
  nameInput, popupAddCard,
  popupEditProfile,
  profileJob,
  profileName,
  selectors,
  validationConfig
} from "./constants.js";
import Card from "../components/Card.js";

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add(classAddRemove.popupOpenClose);
  document.addEventListener(`keydown`, closePopupByPressEscape);
};

// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove(classAddRemove.popupOpenClose);
  document.removeEventListener(`keydown`, closePopupByPressEscape);
  disableButtons();
}

// функция закрытия попапа по клику вне окна попапа
const closePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopup(e.currentTarget);
};

// функция закрытия попапа по нажатию на Escape
const closePopupByPressEscape = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector(selectors.popup);
    closePopup(openedPopup);
  }
};

const disableButtons = () => {
  const buttons = document.querySelectorAll(validationConfig.formSubmit);
  buttons.forEach((item) => {
    item.setAttribute("disabled", "disabled");
  });
};

// функция создания элемента карточки
function createCard(name, link) {
  const card = new Card(name, link, selectors.cardTemplate);
  const cardElement = card.generateCard();
  return cardElement;
};

// функция добавления карточек
const addCard = (name, link) => {
  cardsList.prepend(createCard(name, link));
};

/*---------------------------------------------------------------------------------------*/
//Edit-Profile (работа с попапом)
// функция, выполняемая по нажатию кнопки редактирования профиля
const openEditProfilePopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
};
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

export {
  openPopup,
  closePopup,
  closePopupByClickOnOverlay,
  closePopupByPressEscape,
  createCard,
  addCard,
  openEditProfilePopup,
  handleEditFormSubmit,
  openAddCardPopup,
  handleAddFormSubmit
}
