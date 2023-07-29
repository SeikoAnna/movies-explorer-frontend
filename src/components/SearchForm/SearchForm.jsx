import {useEffect, useState} from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import glass from '../../images/glass.svg';

export default function SearchForm({ moviesStateAction }) {

  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const [shortFilter, setShortFilter] = useState();

  const { film } = values;

  const { movies, setFilteredMovies } = moviesStateAction;

  useEffect(() => {
    if (!film) {
      setIsValid(false)
      setFilteredMovies(movies);
      return;

    }
    const filtered = movies.filter((movie) => {
      const isTitleMatch = movie.title.toLowerCase().includes(film.toLowerCase());
      const isShortMatch = !shortFilter || movie.short === shortFilter;

      return isTitleMatch && isShortMatch;
    });

    setFilteredMovies(filtered);

  }, [film, shortFilter, movies, setFilteredMovies, setIsValid])

  return (
    <section className={'search_section'}>
      <form className='search__form'>
        <div className='search__container'>
          <input
            type='text'
            className='search__input'
            name='film'
            value={film || ''}
            onChange={handleChange}
            placeholder='Фильм'
          />
          <button type='button' className={!isValid ? 'button search__button_type_disabled' : 'button search__button'}>
           <img className='glass__image' src={glass} alt='лупа' />
          </button>
        </div>
        <span className={isValid ? 'input-error' : 'input-error input-error_active'}>
          {errors.film}
        </span>
        <FilterCheckbox shortFilter={shortFilter} setShortFilter={setShortFilter} />
      </form>
    </section>
  );
};
