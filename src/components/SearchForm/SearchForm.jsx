import {useEffect, useLayoutEffect, useState} from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import glass from '../../images/glass.svg';
import './SearchForm.css';
import {useLocation} from "react-router-dom";

export default function SearchForm({ handleSearch }) {

  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  const [shortFilter, setShortFilter] = useState();

  const { searchInput } = values;


  const { pathname } = useLocation();

  // const findFilm = (e) => {
  //   if(e) {
  //     e.preventDefault();
  //   }
  //
  //   if (!film) {
  //     setIsValid(false)
  //     setFilteredMovies(movies);
  //     return;
  //
  //   }
  //   const filtered = movies.filter((movie) => {
  //     const isTitleMatch = movie.title.toLowerCase().includes(film.toLowerCase());
  //     const isShortMatch = !shortFilter || movie.short === shortFilter;
  //
  //     return isTitleMatch && isShortMatch;
  //   });
  //
  //   setFilteredMovies(filtered);
  // }

  const handleShortFilter = () => {
    if(errors.searchInput) return;

    setShortFilter(!shortFilter);
    handleSearch(searchInput, !shortFilter);
    if (pathname === '/movies') {
      localStorage.setItem('shorts', String(!shortFilter));
    }
  };

  const findFilm = (e) => {
    e.preventDefault();

    if (pathname === '/movies') {
      localStorage.setItem('searchFilm', searchInput);
    }
    handleSearch(searchInput, shortFilter);
  };

  useEffect(() => {
    if (pathname === '/movies') {
      const savedInputValue = localStorage.getItem('searchFilm');
      const savedShorts = JSON.parse(localStorage.getItem('shorts'));

      if (savedInputValue) {
        setValues({...values, searchInput: savedInputValue});
      }
      if (savedShorts) {
        setShortFilter(savedShorts);
      }
      if (savedInputValue || savedShorts === true) {
        handleSearch(savedInputValue, savedShorts);
      }
    }
  }, []);


  return (
    <section className='search-section'>
      <form className='search-form' onSubmit={findFilm}>
        <div className='search-form__container'>
          <input
            type='text'
            className='search-form__input'
            name='searchInput'
            value={searchInput || ''}
            onChange={handleChange}
            placeholder='Фильм'
            required
          />
          <button type='submit' disabled={!isValid} className={'button search-form__button'} >
            <img className='search-form__glass-image' src={glass} alt='лупа' />
          </button>
        </div>
        <span className={isValid ? 'search-form__input-error' : 'search-form__input-error search-form__input-error_active'}>
          {errors.searchInput}
        </span>

        <FilterCheckbox shortFilter={shortFilter} setShortFilter={handleShortFilter} />
      </form>

    </section>
  );
};
