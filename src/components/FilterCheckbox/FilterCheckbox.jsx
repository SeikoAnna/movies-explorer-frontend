import './FilterCheckbox.css';

export default function FilterCheckbox({shortFilter, setShortFilter}) {


  return (
    <div className='checkbox-container'>
      <label className='checkbox-label' htmlFor='checkbox'>Короткометражки</label>
      <input
        className={`checkbox`}
        type='checkbox'
        checked={!!shortFilter}
        id='checkbox'
        name='checkbox'
        onChange={(e) => setShortFilter(e.target.checked)}
      />

    </div>
  );
};
