import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import {useEffect,  useState} from "react";
import moviesApi from "../../utils/api/MoviesApi";

export default function MoviesCard({ card, savedFilms, setSavedFilms }) {
  const [likedCard, setLikedCard] = useState(null);
  const [like, setLike] = useState(false);

  const location = useLocation();
  function unixToHoursSeconds(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000 * 60); // Convert to milliseconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return { hours, minutes };
  }

  useEffect(() => {
    if (savedFilms.length) {
      const newLikedCard = savedFilms.find(savedFilm => savedFilm.movieId === card.id);
      setLikedCard(newLikedCard);
      setLike(!!newLikedCard);
    }
  }, [savedFilms, card.id]);

  const handleLikeClick = async () => {
    const copyCard = card;

    try {
      if (likedCard) {
        await moviesApi.removeMovie(likedCard._id).then(() => {
          setLikedCard(null);
          setSavedFilms(prevFilms => prevFilms.filter(savedFilm => savedFilm.id !== copyCard.id));
          setLike(false);
          console.log(likedCard);
        });
      } else {
        copyCard.image = `https://api.nomoreparties.co${card.image.url || card.image}`;
        if(!copyCard.thumbnail) {
          copyCard.thumbnail = 'https://www.yandex.com'
        }
        if(!copyCard.movieId) {
          copyCard.movieId = card.id;
        }

        delete copyCard.id;
        delete copyCard.created_at;
        delete copyCard.updated_at;

        await moviesApi.createMovie(copyCard);
        setLike(true);
        setSavedFilms(prevFilms => [...prevFilms, card]);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleRemoveLike = async () => {

  }

  const { hours, minutes } = unixToHoursSeconds(card.duration);

  return (
    <li className='movies-card'>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>{card.nameRU}</h2>
        <p className='movies-card__time'>{hours}h:{minutes}m</p>
        {
          location.pathname  === '/movies/saved'
          ? <button onClick={handleRemoveLike} type={"button"} className={'like movies-card__to-deleted'} />
            : <button onClick={handleLikeClick} type='button' className={like ? 'like movies-card__liked' : 'like movies-card__not-liked'} />
        }

      </div>
      <div>
        <img src={card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image} alt={`Название фильма ${card.nameRU}`} className='movies-card__image' />
      </div>


    </li>
  )
};
