import { Link } from 'react-router-dom'
import './NotFound.css';

export default function NotFound() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <main>
      <section className='not-found'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
        <Link className='link not-found__button' onClick={goBack}>Назад</Link>
      </section>
    </main>
  );
};
