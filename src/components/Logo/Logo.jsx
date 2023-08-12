import { HashLink as Link } from 'react-router-hash-link';
import './Logo.css';

export default function Logo() {
  return (
    <Link className='link logo' to='/' />
  );
};
