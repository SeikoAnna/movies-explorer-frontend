import './Stacks.css';
import LayoutBlock from "../LayoutBlock/LayoutBlock";



export default function Stacks() {

  const stackStrList = [
    'HTML',
    'CSS',
    'JS',
    'React',
    'Git',
    'Express.js',
    'mongoDB',
  ]


  return (
    <LayoutBlock
      headersTitle={'Технологии'}
      className={'stacks'}
      id={'stacks'}
    >
      <h3 className='stacks__name'>
        7 технологий
      </h3>

      <p className='stacks__description'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>

      <ul className='stacks__list'>
        {
          stackStrList.map(stackStr => (
            <li className='stacks__item' key={stackStr}>
              {stackStr}
            </li>
          ))
        }
      </ul>
    </LayoutBlock>
  );
};
