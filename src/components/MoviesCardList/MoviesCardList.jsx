import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ setVisibleMovies, cards, savedFilms, setSavedFilms }) {
  return (
    <section className={'movies__list'}>
      <ul className='movies__list-inner'>
        {
          cards.length
            ?
              cards.map((card) => (
                <MoviesCard
                  setVisibleMovies={setVisibleMovies}
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
