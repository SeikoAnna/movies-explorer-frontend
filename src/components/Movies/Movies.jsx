import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
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
      <div className={'movies__wrapper'}>

        <SearchForm moviesStateAction={{movies, setFilteredMovies}} />
        <section className='movies__list-wrapper'>
          {
            isLoading
              ? <Preloader />
              : <>
                  <MoviesCardList cards={filteredMovies} />
                  <button type='button' className='button movies__load-movies'>Ещё</button>
                </>
          }

        </section>
      </div>

    </main>
  );
};
