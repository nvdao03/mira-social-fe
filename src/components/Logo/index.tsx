import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'

function Logo() {
  return (
    <Link to={PATH.HOME} className='rotate-0 inline-block'>
      <img className='rotate-[270deg]' src='../../../src/assets/imgs/logo.svg' alt='Logo' />
    </Link>
  )
}

export default Logo
