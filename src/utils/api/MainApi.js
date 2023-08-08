import BaseApi from './BaseApi';

class MainApi extends BaseApi {
  constructor(options) {
    super(options);
  }

  authorize(email, password) {
    return this._fetch(`/signin`, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  }

  register(name, email, password) {
    return this._fetch(`/signup`, {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
  }

  logOut() {
    return this._fetch('/signout', {
      method: "POST",
    })
  }

  getCurrentUserInfo() {
    return this._fetch(`/users/me`);
  }

  editCurrentUserInfo({ name, email }) {
    return this._fetch(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, email })
    });
  }



  _fetch(endpoint, options = {}) {
    const url = `${this._url}${endpoint}`;
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json; charset=utf-8",
      'Accept': 'application/json',
    };
    options.credentials = 'include';

    return fetch(url, options).then(this._checkServerResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  }
});

export default mainApi;
