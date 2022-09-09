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
    return {
      username: this._username.textContent,
      job: this._job.textContent
    }
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._username.textContent = data.name;
    this._job.textContent = data.about;
  }
}
