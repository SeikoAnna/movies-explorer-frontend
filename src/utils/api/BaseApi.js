class BaseApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  setHeaders(headers) {
    this._headers = headers;
  }

  get headers() {
    return this._headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }
}

export default BaseApi
