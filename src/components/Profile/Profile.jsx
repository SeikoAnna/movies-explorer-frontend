import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Profile.css';
import {useAuth} from "../AuthProvider/AuthProvider";

export default function Profile() {

  const { values, handleChange, errors, setIsValid } = useFormAndValidation();

  const { email, name } = values;

  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (!email && !name) {
      setIsValid(false)
    }
  }, [email, name, setIsValid])

  const handleExit = (e) => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <main>
      <section className='profile'>
        <h1 className='profile__title'>Привет, UserName!</h1>
        <form className='profile__form'>
          <div className='profile__input-container'>
            <label className='profile__input-label'>Имя</label>
            <input
              type='text'
              className='profile__input'
              name='name'
              value={name || ''}
              onChange={handleChange}
              required
              minLength='2'
              maxLength='30'
              placeholder='Имя'
            />
          </div>
          <span className="input-error input-error_active">
            {errors.name}
          </span>
          <div className='profile__input-container'>
            <label className='profile__input-label'>E-mail</label>
            <input
              type='email'
              className='profile__input'
              name='email'
              value={email || ''}
              onChange={handleChange}
              required
              placeholder='Email'
            />
          </div>
          <span className="input-error input-error_active">
            {errors.email}
          </span>

          <div className='profile__buttons'>
            <button type='submit' className='link profile__button profile__button_type_edit'>Редактировать</button>
            <NavLink className='profile__button profile__button_type_exit' to='/' onClick={handleExit}>
              Выйти из профиля
            </NavLink>
          </div>
        </form>
      </section>
    </main>
  );
};
