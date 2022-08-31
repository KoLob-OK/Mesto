// import card_1 from '../images/Card-1.jpg'; // вариант 1 (через импорт)
// import card_2 from '../images/Card-2.jpg';
// import card_3 from '../images/Card-3.jpg';
// import card_4 from '../images/Card-4.jpg';
// import card_5 from '../images/Card-5.jpg';
// import card_6 from '../images/Card-6.jpg';
const card_1 = new URL('../images/Card-1.jpg', import.meta.url); //вариант 2
const card_2 = new URL('../images/Card-2.jpg', import.meta.url);
const card_3 = new URL('../images/Card-3.jpg', import.meta.url);
const card_4 = new URL('../images/Card-4.jpg', import.meta.url);
const card_5 = new URL('../images/Card-5.jpg', import.meta.url);
const card_6 = new URL('../images/Card-6.jpg', import.meta.url);

//массив готовых фото
export const initialCards = [
  {
    name: 'Питер',
    link: card_1
  },
  {
    name: 'Бальные танцы',
    link: card_2
  },
  {
    name: 'Птичка на ладони',
    link: card_3
  },
  {
    name: 'Макро',
    link: card_4
  },
  {
    name: 'Одуванчики',
    link: card_5
  },
  {
    name: 'Пёсик',
    link: card_6
  },
];
