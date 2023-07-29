import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import Popup from '../Popup/Popup';
import './Header.css';

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  function handlePopupClick() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        closePopup()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', close)
    }
    return () => {
      document.removeEventListener('keydown', close)
    }
  }, [isOpen])

  return (
    <>
      <header className='header'>
        <Logo />
        <Navigation onClose={handlePopupClick} />
      </header>
      <Popup isOpen={isOpen} onClose={closePopup} />
    </>
  );
};
