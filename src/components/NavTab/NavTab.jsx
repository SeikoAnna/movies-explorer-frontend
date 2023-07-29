import './NavTab.css'
import { Link } from 'react-router-dom';

export default function NavTab() {
  return (
    <nav className={'landing-navigation'}>
      <Link to={'/sign-up'} className={'landing-navigation__button register-button hovered-button animation-transition'}>Регистрация</Link>
      <Link to={'/sign-in'} className={'landing-navigation__button login-button hovered-button animation-transition'}>Войти</Link>
    </nav>
  )
}
