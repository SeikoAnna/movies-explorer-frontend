import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({cards}) {
  return (
    <section className={'movies__list'}>
      <ul className='movies__list-inner'>
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            card={card} />
        ))}
      </ul>
    </section>
  );
};
