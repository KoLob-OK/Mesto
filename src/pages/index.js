import '../pages/index.css';

import {
  selectors,
  validationConfig,
  popupEditProfileButton,
  formEditProfileSubmit,
  popupAddCardButton,
  formAddCardSubmit,
  nameInput,
  jobInput, buttonUpdateAvatar, formUpdateAvatar, avatar
} from '../utils/constants.js';

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';


/*++++++++++++++++++++API+++++++++++++++++++++++*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '3da86922-f76f-47f7-81bc-c1b3b90197e4',
    'Content-Type': 'application/json'
  }
});

let userID = null;

// Загрузка initialCards и данных о пользователе с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([me, cards]) => {
    userInfo.setUserInfo(me);
    userID = me._id;
    initialCardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
/*--------------------API-----------------------*/


/*++++++++++++++++Валидация+++++++++++++++++++++*/

// создаем экземпляр класса FormValidator для формы редактирования профиля
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfileSubmit);
formEditProfileValidator.enableValidation();
// создаем экземпляр класса FormValidator для формы добавления карточки
const formAddCardValidator = new FormValidator(validationConfig, formAddCardSubmit);
formAddCardValidator.enableValidation();
// создаем экземпляр класса FormValidator для формы обновления аватара
const formUpdateAvatarValidator = new FormValidator(validationConfig, formUpdateAvatar);
formUpdateAvatarValidator.enableValidation();

/*----------------Валидация---------------------*/


/*+++++++++++++++++++++++Работа с карточками++++++++++++++++++++++++*/

// функция создания элемента карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    userID: userID,
    handleCardClick: (name, link) => {
      popupExpandPic.open(name, link);
    },
    handleBasketClick: (cardID) => {

      popupDelCard.open();

      popupDelCard.submitDelCard(() => {
        api
          .delCard(cardID)
          .then(() => {
            card.deleteCard();
            popupDelCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleLikeSet: (cardID) => {
      api
        .setLikeCard(cardID)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка установки лайка: ${err}`);
        });
    },
    handleLikeRemove: (cardID) => {
      api
        .delLikeCard(cardID)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка удаления лайка: ${err}`);
        });
    }
  }, selectors);

  return card.generateCard();
};

// создаем экземпляр класса просмотра фото
const popupExpandPic = new PopupWithImage(selectors.popupExpandPic, selectors);
// слушаем события
popupExpandPic.setEventListeners();

// создаем экземпляр класса попапа подтверждения удаления карточки
const popupDelCard = new PopupWithConfirm(selectors.popupDelCard, selectors);
// слушаем события
popupDelCard.setEventListeners();

// создаем экземпляр класса Section для отображения карточек на странице
const initialCardsList = new Section({
  renderer: (card) => {
    initialCardsList.addItem(createCard(card));
  },
}, selectors.cardsList);

// создаем экземпляр класса попапа с формой добавления новой карточки
const popupAddCard = new PopupWithForm({
  popupSelector: selectors.popupAddCard,
  handleFormSubmit: (formData) => {
    popupAddCard.loading(true);
    api
      .addCard(formData)
      .then((formData) => {
        initialCardsList.addItem(createCard(formData), true);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке картинки: ${err}`);
      })
      .finally(() => {
        popupAddCard.loading();
      });
  }
}, selectors, validationConfig);

// устанавливаем слушатели для формы
popupAddCard.setEventListeners();

// Обработчик кнопки добавления карточки
popupAddCardButton.addEventListener('click', () => {
  // Вызовем resetValidation для формы, чтобы сбросить валидацию
  formAddCardValidator.resetValidation();
  popupAddCard.open();
});

/*-----------------------Работа с карточками------------------------*/


/*++++++++++++++++++++++++Работа с профилем+++++++++++++++++++++++++*/

// создаем экземпляр класса UserInfo для получения данных пользователя, который будем использовать в форме попапа редактирования профиля
const userInfo = new UserInfo({
  username: selectors.userName,
  job: selectors.userJob,
  avatar: selectors.userAvatar
});

// создаем экземпляр класса попапа с формой редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: selectors.popupEditProfile,
  handleFormSubmit: (dataForm) => {
    popupEditProfile.loading(true);
    api
      .changeUserData(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Обнаружена ошибка при сохранении данных пользователя: ${err}`);
      })
      .finally(() => {
        popupEditProfile.loading();
      });
  }
}, selectors, validationConfig);
// устанавливаем слушатели для формы
popupEditProfile.setEventListeners();
// обработчик кнопки Edit попапа редактирования профиля
popupEditProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInput.value = info.username;
  jobInput.value = info.job;
  // Вызовем resetValidation для формы, чтобы сбросить валидацию
  formEditProfileValidator.resetValidation();
  popupEditProfile.open();
});


// создаем экземпляр класса попапа с формой обновления аватара
const popupUpdateAvatar = new PopupWithForm({
  popupSelector: selectors.popupUpdateAvatar,
  handleFormSubmit: (data) => {
    popupUpdateAvatar.loading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`);
      })
      .finally(() => {
        popupUpdateAvatar.loading();
      });
  }
}, selectors, validationConfig);
// устанавливаем слушатели для формы
popupUpdateAvatar.setEventListeners();
// обработчик кнопки аватара пользователя
buttonUpdateAvatar.addEventListener('click', () => {
  // Вызовем resetValidation для формы, чтобы сбросить валидацию
  formUpdateAvatarValidator.resetValidation();
  popupUpdateAvatar.open();
});

/*------------------------Работа с профилем-------------------------*/
