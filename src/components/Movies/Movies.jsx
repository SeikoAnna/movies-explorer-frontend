import {useState, useEffect, useMemo} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import searchFilter from "../../utils/searchFilter";
import moviesApi from "../../utils/api/MoviesApi";

export default function Movies() {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedFilms, setSavedFilms] = useState([]);
  const moviesPerPage = 5;

  const visibleMovies = useMemo(() => filteredMovies.slice(0, moviesPerPage * currentPage), [filteredMovies, currentPage]);


  useEffect(() => {
    const storageMovies = localStorage.getItem('movies');

    if (!storageMovies) {
      const fetchFilms = async () => {
        try {
          const data = await fetch('https://api.nomoreparties.co/beatfilm-movies').then(res => res.json());
          if (data.length > 0) {
            localStorage.setItem('movies', JSON.stringify(data));
            setFilteredMovies(data);
            setError('');
          }
        } catch (error) {
          setError('Проблема при загрузке фильмов');
        }
      };

      fetchFilms();
    }

    const fetchSavedFilms = async () => {
      try {
        const data = await moviesApi.getSavedMovies();
        setSavedFilms(data);
        console.log(data);
        return data;
      } catch (err) {
        alert('Не удалось подгрузить сохранённые фильмы')
      }

    }

    fetchSavedFilms();

    const name = localStorage.getItem('searchFilm');
    const shorts = JSON.parse(localStorage.getItem('shorts'));
    filter(name, shorts);
  }, []);

  const filter = useMemo(() => (name, shorts) => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const filtered = searchFilter(storedMovies, name, shorts);
    setError(filtered.length === 0 ? 'Ничего не найдено' : '');
    setFilteredMovies(filtered);
    setCurrentPage(1);
    setIsLoading(false);
  }, []);

  const handleSearch = (name, shorts) => {
    setIsLoading(true);
    filter(name, shorts);
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };



  return (
    <main className='movies'>
      <div className={'movies__wrapper'}>
        <SearchForm handleSearch={handleSearch} />
        <section className='movies__list-wrapper'>
          {
            isLoading
              ? <Preloader />
              : (
                error
                  ? <p className={'movies__error'}>{error}</p>
                  : (
                    <>
                      <MoviesCardList savedFilms={savedFilms} setSavedFilms={setSavedFilms} cards={visibleMovies} />
                      {filteredMovies.length > moviesPerPage * currentPage && (
                        <button
                          type='button'
                          className='button movies__load-movies'
                          onClick={handleLoadMore}
                        >
                          Ещё
                        </button>
                      )}
                    </>
                  )
              )
          }
        </section>
      </div>
    </main>
  );
};
