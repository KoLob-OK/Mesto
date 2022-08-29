// класс данных пользователя
export default class UserInfo {
  // создаем объект с селекторами двух элементов: элемента
  // имени пользователя и элемента информации о себе
  constructor({ username, job }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent
    }

    return userInfo;
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ username, job }) {
    this._username.textContent = username;
    this._job.textContent = job;
  }
}
