import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ cards, savedFilms, setSavedFilms }) {
  return (
    <section className={'movies__list'}>
      <ul className='movies__list-inner'>
        {
          cards.length
            ?
              cards.map((card) => (
                <MoviesCard
                  setSavedFilms={setSavedFilms}
                  savedFilms={savedFilms}
                  key={card.id}
                  card={card} />
              ))
            :
              <></>
        }
      </ul>
    </section>
  );
};
