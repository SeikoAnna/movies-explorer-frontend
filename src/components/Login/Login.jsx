import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Login.css';
import {useAuth} from "../AuthProvider/AuthProvider";
import Logo from "../Logo/Logo";

export default function Login() {

  const { values, handleChange, errors, setIsValid } = useFormAndValidation();

  const { email, password } = values;

  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email && !password) {
      setIsValid(false)
    }
  }, [email, password, setIsValid])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem('token', 'some-token-here'); // todo: LOGIN add token
    navigate('/');
  }

  return (
    <main>
      <section className='authorization'>
        <div className='authorization__logo'>
          <Logo />
        </div>
        <h1 className='authorization__title'>Рады видеть!</h1>
        <form className='authorization__form' onSubmit={handleSubmit}>
          <div className='authorization__input-container'>
            <label className='authorization__input-label'>E-mail</label>
            <input
              type='email'
              className='input authorization__input'
              name='email'
              value={email || ''}
              onChange={handleChange}
              required
              placeholder='E-mail'
            />
            <span className="input-error input-error_active">
              {errors.email}
            </span>
          </div>
          <div className='authorization__input-container'>
            <label className='authorization__input-label'>Пароль</label>
            <input
              type='password'
              className='input authorization__input'
              name='password'
              value={password || ''}
              onChange={handleChange}
              required
              minLength='5'
              maxLength='12'
              placeholder='Пароль'
            />
            <span className="input-error input-error_active">
              {errors.password}
            </span>
          </div>
          <div className='authorization__buttons'>
            <button type='submit' className='button authorization__button'>Войти</button>
            <p className='authorization__text'>Еще не зарегистрированы?
              <Link className='authorization__link' to='/signup'> Регистрация</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};
