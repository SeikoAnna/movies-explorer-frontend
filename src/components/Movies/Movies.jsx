import {useState, useEffect, useMemo} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import searchFilter from "../../utils/searchFilter";
import moviesApi from "../../utils/api/MoviesApi";
import {useGetWidthBrowser} from "../../utils/useGetBrowserWidth";
import {MOBILE_WIDTH, MOVIES_PER_PAGE, MOVIES_PER_PAGE_MOBILE} from "../../utils/constrains";

export default function Movies() {

  const width = useGetWidthBrowser();

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedFilms, setSavedFilms] = useState([]);
  const [moviesPerPage, setMoviesPerPage] = useState(MOVIES_PER_PAGE);
  const [visibleMovies, setVisibleMovies] = useState()


  useEffect(() => {
    if(width < MOBILE_WIDTH) {
      setMoviesPerPage(MOVIES_PER_PAGE_MOBILE);
    } else {
      setMoviesPerPage(MOVIES_PER_PAGE);
    }

    setVisibleMovies(filteredMovies.slice(0, moviesPerPage * currentPage))
  }, [width, filteredMovies, currentPage, moviesPerPage])

  useEffect(() => {
    const storageMovies = localStorage.getItem('movies');

    if (!storageMovies) {
      const fetchFilms = async () => {
        try {
          const data = await fetch('https://api.nomoreparties.co/beatfilm-movies').then(res => res.json()).finally(() => setIsLoading(false));
          if (data.length > 0) {
            localStorage.setItem('movies', JSON.stringify(data));
            setFilteredMovies(data);
            setError('');
          }
        } catch (error) {
          setError('Проблема при загрузке фильмов');
        }
      };

      fetchFilms()
    } else {
      setIsLoading(false);
    }

    const fetchSavedFilms = async () => {
      try {
        await moviesApi.getSavedMovies().then(
          res => {
            setSavedFilms(res)
          }
        );
      } catch (err) {
        alert('Не удалось подгрузить сохранённые фильмы')
      }

    }
    fetchSavedFilms()

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
  }, []);

  const handleSearch = (name, shorts) => {
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
                      <MoviesCardList setVisibleMovies={setVisibleMovies} savedFilms={savedFilms} setSavedFilms={setSavedFilms} cards={visibleMovies} />
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
