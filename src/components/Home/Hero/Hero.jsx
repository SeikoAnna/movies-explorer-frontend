import './Hero.css'
import earthImg from '../../../images/earth.svg';



export default function Hero({pointSmoothScrollRef}) {

  const onSmoothScroll = () => {
    const targetElement = pointSmoothScrollRef.current;

    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;


    let startTime = null;

    const animationScroll = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;

      const easingFunction = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const scrollY = easingFunction(timeElapsed / duration) * distance + startPosition;

      window.scrollTo(0, scrollY);

      if (timeElapsed < duration) {
        requestAnimationFrame(animationScroll);
      }
    };

    requestAnimationFrame(animationScroll);
  }



  return (
    <section className={'hero'}>
      <div className={'hero__content'}>
        <div className={'hero__container'}>
            <div className="hero__container-top">
              <h1 className={'hero__title'}>
                Учебный проект студента факультета
                <br />
                Веб-разработки.
              </h1>

              <p className={'hero__description'}>
                Листайте ниже, чтобы узнать больше про этот проект и его создателя.
              </p>
            </div>


          <div className="hero__container-bottom">
            <button
              className={'hero__button animation-transition hovered-button'}
              onClick={onSmoothScroll}
            >
              Узнать больше
            </button>
          </div>
        </div>

        <img className={'hero__image'} src={earthImg} alt={'earth'} />
      </div>
    </section>
  )
}
