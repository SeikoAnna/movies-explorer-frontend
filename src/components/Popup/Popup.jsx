import { NavLink, useLocation } from 'react-router-dom';
import AccountIcon from '../../images/nav-auth__acc-image.svg';
import './Popup.css';

export default function Popup({ isOpen, onClose }) {
  const location = useLocation();

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  const Links = [
    {
      to: '/',
      title: 'Главная'
    },
    {
      to: '/movies',
      title: 'Фильмы'
    },
    {
      to: '/movies-saved',
      title: 'Сохраненные фильмы'
    }
  ]


  const getLinksClassName = ({ isActive }) => (isActive)
    ? 'link popup__link popup__link_type_active'
    : 'link popup__link'


  return (
    <section className={`popup ${isOpen && ('popup_opened')}`} onMouseDown={handleClickClose}>
      <nav className='popup__nav'>
        <button type='button' className='button popup__close-btn' onClick={onClose} />

        <div className={'popup__content'}>
          <ul className='popup__list'>
            {
              Links.map(i => (
                <li className='popup__list-item'>
                  <NavLink
                    className={getLinksClassName}
                    to={i.to}
                    onClick={onClose}
                  >
                    {i.title}
                  </NavLink>
                </li>
              ))
            }
          </ul>

          <div className={'popup__content-profile-container'}>
            <NavLink
              className='popup__link popup__link_type_acc-btn'
              to='/profile'
            >
              Аккаунт
              <img className='popup__acc-image' src={AccountIcon} alt='Иконка аккаунта' />
            </NavLink>
          </div>
        </div>
      </nav>
    </section >
  );
};
