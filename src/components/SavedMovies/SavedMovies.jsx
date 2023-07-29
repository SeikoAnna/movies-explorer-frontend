import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import moviesDB from '../../utils/moviesDB';

export default function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const movies = moviesDB;
  const [filteredMovies, setFilteredMovies] = useState();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <main className='movies'>
      <SearchForm moviesStateAction={{movies, setFilteredMovies}} />
      <section>
        {
          isLoading ?
            <Preloader /> : <MoviesCardList cards={filteredMovies} />
        }
        <button type='button' className='button movies__load-movies'>Ещё</button>
      </section>
    </main>
  );
};
