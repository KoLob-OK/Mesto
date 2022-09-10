// класс данных пользователя
export default class UserInfo {
  // создаем объект с селекторами двух элементов: элемента
  // имени пользователя и элемента информации о себе
  constructor({ username, job, avatar }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._username.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
