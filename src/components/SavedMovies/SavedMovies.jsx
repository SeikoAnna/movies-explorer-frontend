import {useState, useEffect, useMemo, useLayoutEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import searchFilter from "../../utils/searchFilter";
import moviesApi from "../../utils/api/MoviesApi";

export default function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const fetchSavedFilms = async () => {
      try {
        const data = await moviesApi.getSavedMovies();
        if (data.length > 0) {
          setFilteredMovies(data);
          setSavedMovies(data);
        } else {
          setError('Ничего не найдено');
        }
      } catch (err) {
        setError('Ошибка при загрузке фильмов');
        console.error(err);
      }
    }

    fetchSavedFilms().finally(() => {
      setIsLoading(false);
    });
  }, [])


  const filter = useMemo(() => (name, shorts) => {
    const filtered = searchFilter(savedMovies, name, shorts);
    setError(filtered.length === 0 ? 'Ничего не найдено' : '');
    setFilteredMovies(filtered);
    setIsLoading(false);
  }, [savedMovies]);

  const handleSearch = (name, shorts) => {
    setIsLoading(true);
    filter(name, shorts);
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
                      <MoviesCardList savedFilms={savedMovies} setSavedFilms={setSavedMovies} cards={filteredMovies} />
                    </>
                  )
              )
          }
        </section>
      </div>
    </main>
  );
};
