import BaseApi from "./BaseApi";

class MoviesApi extends BaseApi {
  constructor(props) {
    super(props);
  }

  getSavedMovies() {
    return this._fetch(`/movies`);
  }

  createMovie(movieInfo) {
    return this._fetch(`/movies`, {
      method: "POST",
      body: JSON.stringify({ ...movieInfo })
    });
  }

  async removeMovie(movieId) {
    try {
      const response = await this._fetch(`/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Accept': 'application/json',
        },
        credentials: 'include',
        // body: JSON.stringify({ cardId: movieId }) // Используйте cardId как параметр
      });


      return response; // Возвращаем что-то в зависимости от вашего API
    } catch (error) {
      console.error('Error removing movie:', error);
      throw error;
    }
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


const moviesApi = new MoviesApi({
  baseUrl: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  }
});

export default moviesApi;
