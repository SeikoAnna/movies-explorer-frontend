import './Student.css';
import photo from '../../../images/photo.png';
import LayoutBlock from "../LayoutBlock/LayoutBlock";

export default function Student() {
  return (
    <LayoutBlock
      headersTitle={'Студент'}
      className={'student'}
      id={'student'}
    >
      <div className='student__info'>
        <div className='student__info-text'>
          <div className={'student__into-text__wrapper'}>
            <h3 className='student__name'>
              Анна
            </h3>

            <p className='student__job'>
              Фронтенд-разработчик, 30 лет
            </p>

            <p className='student__description'>
              Я родилась и живу в Санкт-Петербурге, закончила факультет экономики и финансов
              в СПбГУ. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начала кодить. С 2015 года работала в компании «СКБ Контур». После того, как прошла курс по веб-разработке, начала заниматься фриланс-заказами и ушла с постоянной работы.
            </p>
          </div>


            <a
              className='link student__link'
              href='https://github.com/SeikoAnna'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
        </div>

        <img className='student__image' src={photo} alt='Фото цветы' />
      </div>
    </LayoutBlock>
  );
};
