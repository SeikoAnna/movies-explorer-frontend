import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import {useEffect,  useState} from "react";
import moviesApi from "../../utils/api/MoviesApi";

export default function MoviesCard({ setVisibleMovies, card, savedFilms, setSavedFilms }) {
  const [likedCard, setLikedCard] = useState(null);
  const [like, setLike] = useState(false);
  const likedCardData = savedFilms.find(savedFilm => savedFilm.movieId === card.id);

  const location = useLocation();
  function unixToHoursSeconds(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000 * 60); // Convert to milliseconds
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return { hours, minutes };
  }

  useEffect(() => {
    if (savedFilms.length) {
      if(likedCardData) {
        setLikedCard(likedCardData);
      }
    }
  }, [savedFilms]);

  useEffect(() => {
    if(likedCard) {
      setLike(!!likedCard)
    }

  }, [likedCard])

  useEffect(() => {
  }, [like])

  const handleLikeClick = async () => {
    const newCard = {
      country: card.country,
      description: card.description,
      director: card.director,
      duration: card.duration,
      image: card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image,
      movieId: card.id,
      nameEN: card.nameEN,
      nameRU: card.nameRU,
      thumbnail: "https://www.yandex.com",
      trailerLink: card.trailerLink,
      year: card.year
    }

    try {
      if (like) {
        await moviesApi.removeMovie(likedCard._id).then(() => {
          setSavedFilms(prevFilms => prevFilms.filter(savedFilm => savedFilm._id !== likedCard._id));
          setLikedCard(null);
          setLike(false);
        }).catch(err => {
          alert('Вы не можете снять лайк');
        });
      } else {
        await moviesApi.createMovie(newCard).then((res) => {
          setLikedCard(res);
          setLike(true);
        }).catch(() => {
          alert('Вы не можете поставить лайк');
        });
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleRemoveLike = async () => {
    await moviesApi.removeMovie(card._id).then(() => {
        setSavedFilms(prevFilms => prevFilms.filter(savedFilm => savedFilm._id !== card._id));
        setLikedCard(null);
        setLike(false);
        setVisibleMovies(prevFilms => prevFilms.filter(savedFilm => savedFilm._id !== card._id));
      }
    )
  }

  const { hours, minutes } = unixToHoursSeconds(card.duration);

  return (
    <li className='movies-card'>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>{card.nameRU}</h2>
        <p className='movies-card__time'>{hours}h:{minutes}m</p>
        {
          location.pathname  === '/movies-saved'
          ? <button onClick={handleRemoveLike} type={"button"} className={'like movies-card__to-deleted'} />
            : <button onClick={handleLikeClick} type='button' className={like ? 'like movies-card__liked' : 'like movies-card__not-liked'} />
        }

      </div>
      <a href={card.trailerLink}>
        <img src={card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image} alt={`Название фильма ${card.nameRU}`} className='movies-card__image' />
      </a>
    </li>
  )
};
