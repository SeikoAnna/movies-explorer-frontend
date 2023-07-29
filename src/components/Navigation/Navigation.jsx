import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import AccountIcon from '../../images/nav-auth__acc-image.svg';
import PopupImage from '../../images/nav-auth__acc-image_type_768.svg';
import './Navigation.css';
import {useAuth} from "../AuthProvider/AuthProvider";

export default function Navigation({  onClose }) {
  const { isLoggedIn } = useAuth();
  const [showElement, setShowElement] = useState(() => {
    const storedValue = localStorage.getItem('showElement');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    function handleResize() {
      setShowElement(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('showElement', JSON.stringify(showElement));
  }, [showElement]);

  return (
    <>
      {!isLoggedIn ? (
        <nav className='nav-auth'>
          <ul className='nav-auth__list'>
            <li className='nav-auth__list-item'>
              <Link className='link nav-auth__link' to='/sign-up'>
                Регистрация
              </Link>
            </li>
            <li className='button nav-auth__list-item'>
              <Link className='nav-auth__link nav-auth__link_login' to='/sign-in'>
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          {!showElement ? (
            <nav className='nav-auth nav-auth_type_login'>
              <ul className='nav-auth__list nav-auth__list_type_login'>
                <div className='nav-auth__films'>
                  <li className='nav-auth__list-item'>
                    <NavLink className={({ isActive }) =>
                      isActive ? 'link nav-auth__link nav-auth__link_type_active' : 'link nav-auth__link'}
                      to='/movies'>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className='nav-auth__list-item'>
                    <NavLink className={({ isActive }) =>
                      isActive ? 'link nav-auth__link nav-auth__link_type_active' : 'link nav-auth__link'}
                      to='/movies/saved'>
                      Сохраненные фильмы
                    </NavLink>
                  </li>
                </div>
                <li className='nav-auth__list-item'>
                  <NavLink className='link nav-auth__link nav-auth__link_type_acc-btn' to='/profile'>
                    Аккаунт
                    <img className='nav-auth__acc-image' src={AccountIcon} alt='Иконка профиля'/>
                  </NavLink>
                </li>
              </ul>
            </nav>
          ) : (
            <button type='button' className='button nav-auth__popup-button' onClick={onClose}><img className='nav-auth__popup-img' src={PopupImage} alt='Иконка меню' /></button>
          )
          }
        </>
      )}
    </>
  );
};
