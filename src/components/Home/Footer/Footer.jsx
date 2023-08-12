import './Footer.css';
import {useLocation} from "react-router-dom";

export default function Footer() {
  const path = useLocation().pathname;

  if((path === '/sign-up') || (path === '/sign-in')) {
    return
  }

  return (
    <footer className='footer' id='footer'>
      <p className='footer__authors'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__copy'>&copy;{(new Date().getFullYear())}</p>
        <ul className='footer__links'>
          <li className='footer__links-item'>
            <a
              className='link footer__link'
              href='https://practicum.yandex.ru'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__links-item'>
            <a
              className='link footer__link'
              href='https://github.com/SeikoAnna'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
