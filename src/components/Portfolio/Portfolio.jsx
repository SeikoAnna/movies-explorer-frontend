import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio' id='portfolio'>
      <h2 className='portfolio__title'>
        Портфолио
      </h2>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a
            className='link portfolio__link'
            href='https://SeikoAnna.github.io/how-to-learn/'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__link-title'>
              Статичный сайт
            </p>
            <div className='button portfolio__link-arrow' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            className='link portfolio__link'
            href='https://SeikoAnna.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__link-title'>
              Адаптивный сайт
            </p>
            <div className='button portfolio__link-arrow' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            className='link portfolio__link'
            href='https://github.com/SeikoAnna/react-mesto-api-full-gha'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__link-title'>
              Одностраничное приложение
            </p>
            <div className='button portfolio__link-arrow' />
          </a>
        </li>
      </ul>
    </section>
  );
};
